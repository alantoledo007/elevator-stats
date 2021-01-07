import Wrapper from './components/Wrapper';
import './styles/reset.css';
import './styles/global.css';
import './tailwind.output.css';

import Button from './components/Button';
import { useEffect, useState } from 'react';

//views
import ListRequest from './views/ListRequest';
import CreateRequest from './views/CreateRequests';
import Settings from './views/Settings';
import Report from './views/Report';
import Delete from './views/Delete';

//redux
import {createRequest, getRequests, deleteRequest} from './redux/actions/requests'
import { setElevators } from './redux/actions/elevators';
import {connect} from 'react-redux';

const App = ({requests, createRequest, getRequests, elevators, deleteRequest, setElevators}) => {

  const [showModal, setShowModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const onCreate = () => {
    getRequests();
    setShowModal(false);
  };

  const onDestroy = () => {
    getRequests();
    setShowDelete(false);
    setToDelete(null);
  };

  const onDeleteClosed = () => {
    setToDelete(null);
}

  const onChangeSettings = () => {
    setShowSettings(false);
  }

  useEffect(() => {
    getRequests();
  },[getRequests]);

  useEffect(() => {
    if(!toDelete) return;
    setShowDelete(true);
},[toDelete, setShowDelete]);

 return (
  <div>
    <Delete show={showDelete} setShow={setShowDelete} onClose={onDeleteClosed} data={toDelete} destroy={deleteRequest} onDestroy={onDestroy} />
    <Report show={showReport} setShow={setShowReport} elevators={elevators} requests={requests} />
    <CreateRequest show={showModal} setShow={setShowModal} create={createRequest} onCreate={onCreate} />
    <Settings currentQuantity={elevators} show={showSettings} setShow={setShowSettings} change={setElevators} onChange={onChangeSettings} />
    <Wrapper>
      <div className="text-center mb-8">
        <h1 className="mb-4">Stats UP</h1>
        <Button outline onClick={() => setShowModal(true)}>+ Nueva petición</Button>
        <Button outline className="ml-2" onClick={() => setShowSettings(true)}>Ajustes</Button>
        <span className="text-xs px-3 py-1 bg-orange-200 text-orange-800 rounded-full mx-1 bg-red-300">{elevators} ascensores</span>
      </div>
      <div className="flex justify-between">
        <h2>Peticiones</h2>
        <Button className="mb-2" onClick={() => setShowReport(true)}>Calcular</Button>
      </div>
      <hr/>

      <div>
        <ListRequest setToDelete={setToDelete} requests={requests} />
      </div>
    </Wrapper>
  </div>
 );
};

const mapStateToProps = state => ({
  requests: state.requests.requests,
  elevators: state.elevators.elevators
});

const mapDispathToProps = dispatch => ({
  createRequest: data => dispatch(createRequest(data)),
  getRequests: () => dispatch(getRequests()),
  deleteRequest: id => dispatch(deleteRequest(id)),
  setElevators: quantity => dispatch(setElevators(quantity))
})

export default connect(
  mapStateToProps,
  mapDispathToProps
)(App);
