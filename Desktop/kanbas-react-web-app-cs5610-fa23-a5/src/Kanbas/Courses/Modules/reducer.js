const initialState = {
    modules: [],
    module: { name: "New Module 234",
              description: "New Description" },
  };
  const modulesSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
      setModules: (state, action) => {
        state.modules = action.payload;
      },
      addModule: (state, action) => {
        state.modules = [action.payload, ...state.modules];
      },
  
      deleteModule: (state, action) => {
        state.modules = state.modules.filter(module => module.id !== action.payload);
    },
    updateModule: (state, action) => {
        state.modules = state.modules.map(module => 
            module.id === action.payload.id ? action.payload : module
        );
    },
    setModule: (state, action) => {
        state.module = action.payload;
    },
    
    },
  });
  export const { addModule, deleteModule,
    updateModule, setModule, setModules } =
    modulesSlice.actions;
  export default modulesSlice.reducer;
  