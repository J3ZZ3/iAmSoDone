const validateInput = (type, value) => {
    if(value.trim() === "") return {
    valid: false,
    error: 'Fill out this field'
      }
      if(type ==='string') {
        return /([A-Za-z])+/.test(value) ? {
          valid:true, error:null
        } : {
          valid: false, error: 'Only Use Alphabets)'
        }
      }
      if (type === 'email') {
        return /\S+\@\S+\.\S+/.test(value) ? {
          valid: true, error: null
        }: {
          valid:false, error: 'Email required'}
      }
        if(type ==='number') {
            return /^\d+$/.test(value) ? {
              valid:true, error:null
            } : {
              valid: false, error: 'Numbers Only'
            }
          }
          if(type === 'password'){
            console.log('password valid');

            if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*[~!@#$&*])(?=.*[\d]).{8,}$/.test(value)){
                return {
                    valid: true, error:null
                }
            }
            
          }

          const lengthErr ='Password must be at least 8 characters long'
          const upperCaseErr = 'Password must contain at least one uppercase letter'
          const lowerCaseErr = 'Password must contain at least one lowercase letter'
          const numberErr = 'Password must contain at least one number'
          const specialCharErr = 'Password must contain at least one special character'
          const errors = []
           
          if (!(/.{8,}/.test(value))) {
            errors.push(lengthErr)
          }
          if (!/([A-Z])/.test(value)) {
            errors.push(upperCaseErr)
          }
          if (!(/([a-z])/.test(value))) {
            errors.push(lowerCaseErr)
          }
          if (!(/\d/.test(value))) {
            errors.push(numberErr)
          }
          if (!(/([~!@#$&*])/.test(value))) {
            errors.push(specialCharErr)
          }

          console.log({errors});
          return { valid: false, errors }
          
      
   };

   export default validateInput