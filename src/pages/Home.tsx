import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface EditTaskArgs {
  id:number; 
  taskNewTitle:string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const findTodoTitle = tasks.some(task => task.title === newTaskTitle);

    if (findTodoTitle) {
      return Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome'
      )
      
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldTasks => [...oldTasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updateTasks = tasks.map(task => ({ ...task }))

    const foundItem = updateTasks.find(task => task.id === id);

    if (!foundItem) return;

    foundItem.done = !foundItem.done;

    setTasks(updateTasks);

  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        { text: 'NÃO', style:'cancel', onPress: () => { } },
        { text: 'SIM', style:'destructive', onPress: () => setTasks(tasks.filter(task => task.id !== id)) },
      ]
    )

  }

  function handleEditTask({id, taskNewTitle}:EditTaskArgs){
    const updateTasks = tasks.map(task => ({ ...task }))

    const foundItem = updateTasks.find(task => task.id === id);

    if (!foundItem) return;

    foundItem.title = taskNewTitle;

    setTasks(updateTasks);

  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})