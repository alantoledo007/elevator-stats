// se crea un "clase" para controlar todos los calculos de forma ordenada.
function Calculator() {
    this.levels = 4;
    this.elevators = [];
    this.data = {}; // este objeto va a almacenar la información
    this.requests = [] //las peticiones.
    this.time = 0; //tiempo recorrido. requerido para finalizar peticiones.
}


//para que sea escalable, es necesario controlar la cantidad de ascensores.
Calculator.prototype.createElevators = function(quantity) {
    const elevator_default = {
        free: true,
        level: 0,//nivel actual del ascensor.
        to:null
    }
    for (let i = 0; i < quantity; i++) {
        let id = i+1; //se crea una ID para identificar a cada ascensor, mas alla de su key.
        this.elevators.push({
            id,
            ...elevator_default
        });
        this.initData(id);
    }
}

//este campo va a setear los datos estadísticos iniciales
Calculator.prototype.initData = function(id) {
    this.data = {
        ...this.data,
        [id]:{
            levels: 0
        }
    }
}

//se cargan y mapean las peticiones para no tener errores de tipado y setear campos necesarios
Calculator.prototype.loadRequests = function(records) {
    this.requests = records.map(item => ({
        ...item,
        from: JSON.parse(item.from).map(i => parseInt(i)),
        to: JSON.parse(item.to).map(i => parseInt(i)),
        calls: Math.floor(((item.end_time - item.start_time) * 60) / item.frequency), //estimativo de llamadas.
        calls_processed: 0,
        pending_time: 0,//Se acarrea el tiempo sobrante para la siguiente vuelta del bucle.
        finished: false// si ya se calculo esta petición.
    }));
}

//procesador de llamadas
Calculator.prototype.call = function (from, to) {
    //los candidatos: ascensores, libres.
    let candidates = this.elevators.filter(item => item.free);
    if(!candidates.length) {
        //no hay ascensores disponibles.
        return;
    };

    //se ordenan los candidatos para elegir a un ganador (el más cercano).
    candidates.sort((a,b) => {
        const a_direction = a.level > from ? 1 : -1; //no aseguramos que no existan valores negativos.
        const b_direction = b.level > from ? 1 : -1;
        
        if(((a.level - from) * a_direction) > ((b.level - from) * b_direction)) {
            return 1;
        }

        if(((a.level - from) * a_direction) < ((b.level - from) * b_direction)) {
            return -1;
        }
        return 0;
    });
    let winner = candidates[0]; //tenemos un ganador!
    let key = this.elevators.findIndex(item => item.id === winner.id); //ahora hay que aplicar cambios.

    //se almacenan los niveles recorridos para llegar al lugar de llamada.
    this.data[this.elevators[key].id].levels += (from - this.elevators[key].level) * (from > this.elevators[key].level ? 1 : -1);
    
    //ahora el elevador está ocupado, y tiene un destino (to).
    this.elevators[key].free = false;
    this.elevators[key].level = from;
    this.elevators[key].to = to;
}

//esta es la señal para ir a destino.
Calculator.prototype.go = function() {
    this.elevators.forEach((item, key) => {
        if(!item.free) {
            this.processCall(key, item.level, item.to);
        }
    });
}

//procesamos la llamada, el ascensor llega a su destino.
Calculator.prototype.processCall = function(key, from, to) {
    
    //se registran los niveles recorridos.
    this.data[this.elevators[key].id].levels += (from - to) * (from > to ? 1: -1)

    //ahora el ascensor está libre y listo para otra llamada!
    this.elevators[key] = {
        ...this.elevators[key],
        level: to,
        free:true,
        to: null
    }
}

//ahora vamos al grano, este metodo se encarga de controlar las llamada.
Calculator.prototype.grace = function() {

    //siempre y cuando exista un petición sin terminar.
    while (this.requests.find(item => !item.finished)) {
        //accedemos a todas las peticiones NO finalizadas.
        let terminator = this.requests.filter(item => !item.finished);
        terminator.sort(this.sureOrder);

        //la idea es agrupar por tiempos, pero para eso necesitamos un referente.
        let ref = terminator[0];

        //el tiempo avanza
        this.time += ref.pending_time > 0 ? (ref.pending_time / 60) : (ref.frequency / 60);

        //y ahora viene el golpe de gracia de terminator
        terminator.forEach(item => {
            let isValid = false;
            let key = this.requests.findIndex(i => i.id === item.id);
            if(ref.pending_time > 0){
                isValid = item.pending_time === ref.pending_time && item.start_time <= this.time;
            }else{
                isValid = ref.frequency === item.frequency && item.start_time <= this.time;
            }

            if(!isValid){
                if(this.requests[key].pending_time > 0){
                    this.requests[key].pending_time -= ref.pending_time > 0 ? ref.pending_time : ref.frequency;
                }else{
                    this.requests[key].pending_time = ref.pending_time > 0 ? ref.pending_time : ref.frequency;
                }
            }else{
                this.requests[key].calls_processed +=1;
                if(this.requests[key].calls_processed >= this.requests[key].calls || this.time >= this.requests[key].end_time){
                    this.requests[key].finished = true;
                };
                item.from.forEach(from => {
                    item.to.forEach(to => {
                        this.call(from, to);
                    })
                    this.go();
                })
            }

            
        });
    }

}

//aseguramos el orden de las peticiones, es muy importante. Tiempo inial -> acarreo -> frecuencia.
Calculator.prototype.sureOrder = function (a,b) {
    if(a.start_time > b.start_time) return 1;
    if(a.start_time < b.start_time) return -1;
    if(a.pending_time > 0 || b.pending_time > 0){
        if(a.pending_time < b.frequency && b.pending_time < a.frequency ){
            if(a.pending_time > 0 && b.pending_time > 0){
                if(a.pending_time > b.pending_time) return 1;
                if(a.pending_time < b.pending_time) return -1;
            };
            if(a.pending_time > 0 && b.pending_time === 0) return -1;
            if(a.pending_time === 0 && b.pending_time > 0) return 1;
        }
    }
    if(a.frequency > b.frequency) return 1;
    if(a.frequency < b.frequency) return -1;
    return 0;
}

Calculator.prototype.getTotal = function() {
    return Object.values(this.data).reduce((acc,item) => {
        return acc + item.levels;
    }, 0)
}

export default Calculator;