import React, { createContext, SetStateAction, useContext, useState } from 'react';

type TaskContextValue = {
    data: Date,
    setData: React.Dispatch<SetStateAction<Date>>,
}

export const TaskContext = createContext<TaskContextValue>({
    data: new Date(),
    setData: () => {}
})

export function useData(): [Date, React.Dispatch<SetStateAction<Date>>] {
  let context = useContext(TaskContext);
  return [context.data, context.setData];
}

type TaskProviderProps = {
    children?: React.ReactNode;
}

const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [data, setData] = useState<Date>(new Date());

  const value = {
      data: data,
      setData: setData
  }

  return (
      <TaskContext.Provider value={value}>
        {children}
      </TaskContext.Provider>
  )
}

export default TaskProvider;
