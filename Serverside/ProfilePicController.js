
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { UserDataSignUp } = require('./usermodel.js');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWTKEY;


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dest = path.join(__dirname, '.', 'storage', 'profileImage');
        cb(null, dest);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        const ext = path.extname(file.originalname);
        const fileName = 'profile-' + uniqueSuffix + ext;
        cb(null, fileName);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, 
}).single('pic');

exports.profileUpload = (req, res) => {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: 'Upload Error', error: err.message });
      } else if (err) {
        console.error('Error uploading profile image:', err);
        return res.status(500).json({ message: 'Upload Error', error: err.message });
      }
  
      const UserToken = req.headers.authorization.split(" ")[1];
      if (!UserToken) {
        return res.status(401).json({ message: 'Unauthorized: Missing User Token' });
      }
  
      try {
        const decodedToken = jwt.verify(UserToken, secretKey);
        const userEmail = decodedToken.email;
        const existingUser = await UserDataSignUp.findOne({ email: userEmail });
        if (!existingUser) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        const existingFilename = existingUser.pic.filename;
        console.log(existingFilename);
        if (existingFilename) {
          const imagePath = path.join(__dirname, '.', 'storage', 'profileImage', existingFilename);
          try {
            await fs.unlinkSync(imagePath);
          } catch (error) {
            console.error('Error deleting existing profile image:', error);
          }
        }
  
        const newpic = {
          filename: req.file.filename, 
          size: req.file.size,
        };
  
        const updatedUser = await UserDataSignUp.findOneAndUpdate(
          { email: userEmail },
          { $set: { pic: newpic } },
          { new: true }
        );
  
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        return res.status(200).json({ message: 'Profile image uploaded successfully', user: updatedUser });
      } catch (error) {
        console.error('Error updating user with profile image:', error);
        return res.status(500).json({ message: 'Server Error', error: error.message });
      }
    });
  };




exports.getProfilepic = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization token is missing or invalid' });
    }
    const UserToken = authHeader.split(' ')[1];
    try {
        const decodedToken = jwt.verify(UserToken, secretKey);
        const userEmail = decodedToken.email; 
    
        const user = await UserDataSignUp.findOne({ email: userEmail });
        if (!user || !user.pic) {
            return res.status(204).json({ message: 'Profile picture not found' });
        }
        const imagePath = path.join(__dirname, '.', 'storage', 'profileImage',user.pic.filename);
        
        if (!fs.existsSync(imagePath)) {
            return res.status(204).json({ message: 'Profile picture not found' });
        }

        const pic = fs.readFileSync(imagePath);
        const imageMimetype = 'image/png'; 
        res.contentType(imageMimetype);
        res.send(pic);
    } catch (error) {
        console.error('Error fetching profile picture:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}