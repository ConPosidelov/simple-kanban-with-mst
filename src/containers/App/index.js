import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Rnd from 'react-rnd';
import { 
  Container, 
  Row, 
  Col, 
  Button
} from 'reactstrap';

import { getModel } from '../../models/common/customStore';
import { newTaskModel, setDefaultTask } from '../../models/Task/newTask';
import DevTools from "../../components/DevTools";
import TaskList from '../../components/TaskList';
import TaskEditor from '../../components/TaskEditor';
import './App.css';



class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      addTask: () => {}
    }
  }

  addTask = ({addTask}) => {
    setDefaultTask();
    const { tableStore: {toggleEditor} } = this.props;
    this.setState({addTask}, toggleEditor('create')); 
  };
   
  onDragEnd = (result) => {
    const { source, destination } = result;
    const { addTaskFromRoot, deleteTask } = this.props.tableStore;
    if(!destination) return;
    if (source.droppableId !== destination.droppableId) {
      const columnsIndex = +destination.droppableId;
      const taskId = source.index;
      const task = getModel(taskId);
      const taskClone = {...task};
      deleteTask(task);
      addTaskFromRoot(columnsIndex, taskClone);
    }   
  };

  toggleDevTools = () => this.props.tableStore.toggleDevTools();

  undo = () => {
    const { snapshots, counterUndoRedo } = this.props.history;
    let counter = counterUndoRedo.get();
    counter++;
    if(snapshots[counter]){
      snapshots[counter].replay();
      counterUndoRedo.set(counter);
    }
  };

  redo = () => {
    const {snapshots, counterUndoRedo} = this.props.history;
    let counter = counterUndoRedo.get();
    if(!counter) return;
    counter--;
    if(snapshots[counter]){
      snapshots[counter].replay();
      counterUndoRedo.set(counter);
    }
  };

  render() {
    const { 
      tableStore: { 
        columns, 
        editTaskMode, 
        toggleEditor,
        isDevToolsVisible
      } 
    } = this.props;
    
    const column = columns.map((item, i) => {
      const { title, addTask, sortedByPriority } = item;
      return (
        <Droppable key={i} droppableId={`${i}`}>
          {(provided, snapshot) => (
            <Col>
              <div 
                className="Column"
                ref={provided.innerRef}
              >
                <div className="Column-title">
                  {title}
                  <div 
                    className="Column-title_add-task"
                    onClick={() => this.addTask({addTask})}
                  >
                    +
                  </div>
                </div>
                <div className="Column-body">
                  <TaskList tasks={sortedByPriority} />
                </div>
                {provided.placeholder}
              </div>
            </Col>
          )}
        </Droppable>  
      );
    });

    const devTools = (
      <Rnd
        className="rnd-dev_tools"
        default={{
          y: 200,
          x: 700,
          width: 500,
          height: 200,
        }}
      >
        <DevTools />
      
      </Rnd>
    );

    const navControls = (
      <div className="App-nav_controls">
        <Container>
          <div className="nav_controls">
            <Button
              className="nav_controls-btn"
              size="sm" 
              color="success" 
              onClick={this.undo}
            >
              Undo
            </Button>

            <Button
              className="nav_controls-btn"
              size="sm" 
              color="success" 
              onClick={this.redo}
            >
              Redo
            </Button>

            <Button
              className="nav_controls-btn dev-tools"
              size="sm" 
              color="secondary" 
              onClick={this.toggleDevTools}
            >
              Dev Tools
            </Button>
          </div>
        </Container>            
      </div>               
    );

    return (
      <div>
        <DragDropContext
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
        >
          <div className="App">
            <Container>
              <Row>
                <Col>
                  <div className="App-nav">
                    <div className="App-nav_title">
                      KanbanFlow
                    </div>
                  </div>
                </Col>
              </Row>
              
              <div className="App-table">
                <Row>
                  {column}
                </Row>
              </div>
              {
                editTaskMode !== 'none'
                ? <TaskEditor editTaskMode={editTaskMode} toggleEditor={toggleEditor} task={newTaskModel} addTask={this.state.addTask} />
                : null
              }
            </Container>
           
          </div>
          
        </DragDropContext>

        {
          isDevToolsVisible
          ? devTools
          : null
        }
        {navControls}
      </div>
    );
  }
};

export default inject('tableStore', 'history')(observer(App));

//<DevTools />