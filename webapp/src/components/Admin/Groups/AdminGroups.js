import React, {useState} from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import {useDispatch, useSelector} from 'react-redux';
import {Spinner} from 'react-bootstrap';
import GroupAddModal from './GroupAddModal';
import {deleteGroup} from '../../../services/group/groupActions';
import GroupUpdateModal from './GroupUpdateModal';

const AdminGroups = () => {
  
  const [activeItem, setActiveItem] = useState(null);
  
  const [modalShow, setModalShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  
  const dispatch = useDispatch();
  
  const isLoadingAllGroup = useSelector(({group}) => group.isLoadingAllGroup);
  const error = useSelector(({group}) => group.error);
  const groups = useSelector(({group}) => group.groups)
  
  const deleteUserGroup=()=>{
    dispatch(deleteGroup(activeItem.id))
    setActiveItem(null);
  }
  
  return (
    <>
      <Row style={{
        paddingBottom: "20px",
      }}>
        <Card>
          <Card.Header>Группы</Card.Header>
          <Card.Body style={{overflowY: "scroll", height: "70vh", width: "85vh"}}>
            <Table responsive hover>
              <thead>
              <tr>
                <th>ИД</th>
                <th>Короткое название</th>
                <th>Полное название</th>
              </tr>
              </thead>
              <tbody>
              {isLoadingAllGroup
                ? (
                  groups.map((item, id) => (
                      <tr key={item.id}
                          onClick={()=>setActiveItem(item)}
                          style={{backgroundColor:!!activeItem && activeItem.id === item.id && "rgb(208,208,208)"}}
                      >
                        <td>{item.id}</td>
                        <td>{item.shortName}</td>
                        <td>{item.name}</td>
                      </tr>
                    )
                  )
                )
                  :<Spinner animation="border"/>}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Row>
      <Row>
        <Button
          variant="primary"
          style={buttonCss}
          onClick={() => setModalShow(true)}
        >
          Добавить
        </Button>
        <Button
          variant="primary"
          style={buttonCss}
          disabled={activeItem === null}
          onClick={deleteUserGroup}
        >
          Удалить
        </Button>
        <Button
          variant="primary"
          disabled={activeItem === null}
          style={buttonCss}
          onClick={() => setUpdateShow(true)}
        >
          Изменить
        </Button>
      </Row>
      <GroupAddModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <GroupUpdateModal
        show={updateShow}
        onHide={() => setUpdateShow(false)}
        item={{...activeItem}}
      />
    </>
  )
}
const buttonCss = {
  marginLeft: "10px",
  marginRight: "1O0px",
  width: "100px",
  textAlign: "center",
  height: "45px"
};

export default AdminGroups;