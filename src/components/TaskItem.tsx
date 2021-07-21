import React, { useEffect, useRef, useState } from "react";
import { 
    View,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Image,

 } from 'react-native'

 import trashIcon from '../assets/icons/trash/trash.png'
 import editIcon from '../assets/icons/edit/edit.png'
 import dividerIcon from '../assets/icons/divider/divider.png'
 import Icon from 'react-native-vector-icons/Feather';

import { Task } from './TasksList'
import { EditTaskArgs } from "../pages/Home";

interface TaskItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({id, taskNewTitle}:EditTaskArgs) => void;
}


export function TaskItem({task,editTask,removeTask,toggleTaskDone }:TaskItemProps) {

    const [isEditing, setIsEditing] = useState(false);
    const [taskValue, setTaskValue] = useState(task.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
      setIsEditing(true);
    }

    function handleCancelEditing() {
      setTaskValue(task.title);
      setIsEditing(false);
      

    }
    function handleSubmitEditing() {



      editTask({id: task.id, taskNewTitle: taskValue})
    }
    useEffect(() => {
        if (textInputRef.current) {
          if (isEditing) {
            textInputRef.current.focus();
          } else {
            textInputRef.current.blur();
          }
        }
      }, [isEditing])
    return (
        <View style={styles.container}>
        <View style={styles.infoContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            style={(task.done ? styles.taskMarkerDone : styles.taskMarker)}
          >
            {task.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
          
            value={taskValue}
            editable={isEditing}
            onChangeText={setTaskValue}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
            
          />
        </TouchableOpacity>
      </View>
      <View style={ styles.iconsContainer } >
  { isEditing ? (
    <TouchableOpacity
      onPress={handleCancelEditing}
    >
      <Icon name="x" size={24} color="#b2b2b2" />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={handleStartEditing}
    >
      <Image source={editIcon} />
    </TouchableOpacity>
  ) }

  <View 
    style={ styles.iconsDivider }
  />

  <TouchableOpacity
    disabled={isEditing}
    onPress={() => removeTask(task.id)}
  >
    <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
  </TouchableOpacity>
</View>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  infoContainer: {
    flex:1,
  },
    iconsContainer:{
      flexDirection: "row",
      alignItems: 'center',
      paddingLeft: 12,
      paddingRight: 24
    },
    iconsDivider:{
      width: 1,
      height: 24,
      backgroundColor: 'rgba(196, 196, 196, 8.24)',
      marginHorizontal: 12
    },
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
   
  })