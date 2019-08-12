

export const validateInput = arg => {
    let error = {};

    for(var key in arg){
      if(arg[key].error){
        return {
          error: true, 
          errorMessage: arg[key].errorMessage
        }
      };
    }
    return error;
  }