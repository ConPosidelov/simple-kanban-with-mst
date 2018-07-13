import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import {Draggable} from 'react-beautiful-dnd';

import {setModel} from '../../models/common/customStore';
import {newTaskModel} from '../../models/Task/newTask';
import {getColor} from '../../utils/colors';
import './Task.css';


const getItemStyle = (isDragging, draggableStyle, mainColor, backColor) => {
  return {
    border: isDragging ? `3px solid ${mainColor}` : `1px solid ${mainColor}`,
    userSelect: 'none',
    background: backColor,
    ...draggableStyle
  }
};

class Task extends Component  {

  editTask = () => {
    const {task, tableStore: {toggleEditor}} = this.props;
    ['title', 'color', 'priority'].forEach(prop => {
      newTaskModel[prop] = task[prop]
    });
    setModel('currentTask', task);
    toggleEditor('edit');
  }

  render () {
    const { id, title, color, priority } = this.props.task;
    const { mainColor, backColor } = getColor(color);
  
    return (
      <Draggable
        key={id}
        draggableId={id}
        index={id}
      >
        {(provided, snapshot) => { 
          setModel(id, this.props.task);
          return (
          <div 
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={
              getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style,
                mainColor,
                backColor
              )
            }
            className="Task" 
            onDoubleClick={this.editTask}
          >
            <div className="Task-title">{title}</div>  
              <div className="Task-body">
                <div className="Task-body_priority">
                {`Priority: ${priority}`}
              </div>
            </div>
          </div>
        )}}
      </Draggable>
    );
  }
};

export default inject('tableStore')(observer(Task));