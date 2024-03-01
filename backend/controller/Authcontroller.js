const LogRegModel = require('../model/Authmodel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class LogRegControllers {

   
  /**
   * @Method registration
   * @Description to create user
   */
  async registration(req, res) {
    
    try {
              const { name, email, password, confirmPassword } = req.body;
  
                  if (!name || !email || !password ) {
                    return res.status(400).json({
                    status:false,
                    message: 'Fields should not be empty',
                   });
                }
  
            const isEmailExists = await LogRegModel.findOne({ email });
  
               if (isEmailExists) {
                 return res.status(400).json({
                 status:false,
                 message: 'Email already exists',
                  });
                }
      
        
      
  
                 if (password !== confirmPassword) {
                  return res.status(400).json({
                  status:false,
                  message: 'Passwords do not match',
                  });
               }
             else{

                const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  
                const registerData = await LogRegModel.create({
                   name,
                   email,
                   password: hashedPassword,
                   image: req.file?.filename,

        
                  });
      
                     res.status(200).json({
                     status:true,
                     data:registerData,
                     msg:"Register Successfully Done"
                    })
      
      
      } 
      }
  
       catch (error) {
         console.error(error);
         res.status(500).json({ error: 'Invalid request' });
    }
  }
  
  

  
  
  
  /**
   * @Method signIn
   * @Description to sing user
   */

  async signIn(req, res) {
    try {
             if (!req.body.email || !req.body.password) {
             return res.status(400).json({
             message: 'Fields should not be empty',
            });
            } else {
                     let isUserExists = await LogRegModel.findOne({ email: req.body.email });
        

                            if (!isUserExists) {
                            return res.status(400).json({
                            status: false,
                            message: 'User not found',
                           });
                           }

                       if (isUserExists.role === 'user' ) {
                                     if (isUserExists) {
                                           const hasPassword = isUserExists.password;
                                           const decryptPassword = bcrypt.compareSync(req.body.password, hasPassword);
    
                               if (decryptPassword) {
                                   // Token creation
                                      const usertoken = jwt.sign(
                                         {
                                            id: isUserExists._id,
                                            email: isUserExists.email,
                                            role: isUserExists.role
                                         },
                                            'WTS10AC23D',
                                          { expiresIn: '60m' }
              );
    
                               return res.status(200).json({
                               status: true,
                               token: usertoken,
                               name: isUserExists.name,
                               email: isUserExists.email,
                               password: isUserExists.password,
                               role: isUserExists.role,
                               message: 'UserLogin successfully done',
                              });
            } 
          }


                           } else if (isUserExists.role === 'admin' ) {
        
                               if (isUserExists) {
                                      const hasPassword = isUserExists.password;
                                      const decryptPassword = bcrypt.compareSync(req.body.password, hasPassword);
    
                                       if (decryptPassword) {
                                           // Token creation
                                            const admintoken = jwt.sign(
                                            {
                                              id: isUserExists._id,
                                              email: isUserExists.email,
                                              role: isUserExists.role
                                             },
                                                   'WTS10AC23D',
                                                  { expiresIn: '60m' }
              );
    
                                  return res.status(200).json({
                                     status: true,
                                     token: admintoken,
                                     role: isUserExists.role,
                                     name: isUserExists.name,
                                     email: isUserExists.email,
                                     password: isUserExists.password,
                                     message: 'AdminLogin successfully done',
                                     });
            } 
          }
          

        } 
         else {
                     return res.status(400).json({
                     status: false,
                     message: 'Invalid Credential',
                     });
        }
      }
    } catch (error) {
           console.error(error);
           return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  /**
     * @Method viewProfile
     * @Description View user profile information
     */
  async viewProfile(req, res) {
    try {
      
                  const { id, email } = req.user;
 
                  const userProfile = await LogRegModel.findById(id);

                               if (!userProfile) {
                                  return res.status(404).json({
                                  status: false,
                                  message: 'User profile not found',
                                });
                             }

      
                res.status(200).json({
                status: true,
                data: userProfile,
                message: 'User profile retrieved successfully',
                });
               } catch (error) {
                   console.error(error);
                   res.status(500).json({ error: 'Internal Server Error' });
              }
  }


  
  /**
   * @Method getAllUsers
   * @Description View list of all user profiles
   * @Role admin
   */
  async getAllUsers(req, res) {
    try {
      
              const allUsers = await LogRegModel.find({ role: 'user' });

                 res.status(200).json({
                 status: true,
                 data: allUsers,
                 message: 'List of all user profiles retrieved successfully',
                });
                } catch (error) {
                      console.error(error);
                      res.status(500).json({ error: 'Internal Server Error' });
                 }
  }

  





}







  

module.exports = new LogRegControllers()
