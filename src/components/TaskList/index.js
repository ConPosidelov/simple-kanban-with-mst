import React from 'react';
import { observer } from 'mobx-react';
import Task from '../Task';
import './TaskList.css';


const TaskList = ({tasks}) => tasks.map( item => <Task key={item.id} task={item} /> );

export default observer(TaskList);