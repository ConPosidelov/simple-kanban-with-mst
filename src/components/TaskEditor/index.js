import React from 'react';
import { observer } from 'mobx-react';
import { 
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import {getModel} from '../../models/common/customStore';
import { getColor, getColorsArr } from '../../utils/colors';
import './TaskEditor.css';

@observer
class ModalExample extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      newTask: this.props.task
    }    
  }

  toggle = () => {
    const { toggleEditor } = this.props;
    toggleEditor();
  }

  saveTask = () => {
    const { newTask } = this.state;
    const { addTask } = this.props;
    addTask(newTask);
    this.toggle();
  }

  editTask = () => {
    const { newTask } = this.state;
    const {editTask} = getModel('currentTask');
    editTask(newTask);
    this.toggle();
  }

  deleteTask = () => {
    const {deleteTask} = getModel('currentTask');
    deleteTask();
    this.toggle();
  }

  changeFilds = (val, fild) => {
    this.setState({
      newTask:{
        ...this.state.newTask,
        [fild]: val
      }
    });
  }

  render() {
    const { editTaskMode = 'none' } = this.props;
    const { title, color, priority } = this.state.newTask;
    
    const colorsInput = getColorsArr().map(item => {

      const checkStyle = {
        color: getColor(item).mainColor,
      };
      return (
        <FormGroup check inline key={item}>
          <Label check style={checkStyle}>
            <Input 
              type="radio" 
              name={item}
              checked={item === color}
              onChange={() => this.changeFilds(item, 'color')} 
            />{' '}
              {item}
          </Label>
        </FormGroup>
      );
    });

    const priorityInput = [0,1,2,3,4,5].map(item => {
      return (
        <FormGroup check inline key={item}>
          <Label check>
            <Input 
              type="radio" 
              name={item}
              checked={item === priority}
              onChange={() => this.changeFilds(item, 'priority')} 
            />{' '}
              {item}
          </Label>
        </FormGroup>
      );
    });

    return (
      <div>
        <Modal className="modal-editor" isOpen={editTaskMode !== 'none'} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>
            <Input
              value={title}
              onChange={e => this.changeFilds(e.target.value, 'title')}
            />
          </ModalHeader>
          <ModalBody>
            <FormGroup >
              <legend>Colors</legend>
              {colorsInput}
            </FormGroup>

            <FormGroup >
              <legend>Priority</legend>
              {priorityInput}
            </FormGroup>
                       
          </ModalBody>
          <ModalFooter>
            {
              editTaskMode === 'create'
              ? <Button color="primary" onClick={this.saveTask}>Create</Button>
              : null
            }
            {
              editTaskMode === 'edit'
              ? (
                <div className="edit-btns">
                  <Button
                    className="btn-delete" 
                    outline 
                    color="danger" 
                    onClick={this.deleteTask}
                  >
                    Delete
                  </Button>
                  <Button
                    className="btn-edit"
                    outline 
                    color="primary" 
                    onClick={this.editTask}
                  >
                    Edit
                  </Button>
                </div>
                )
              : null
            }

            <Button 
              className="btn-cancel"
              outline
              color="secondary" 
              onClick={this.toggle}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;