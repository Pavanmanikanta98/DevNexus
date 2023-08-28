const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');
const User = require('../../models/Users');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const { required } = require('joi');

//@route api/profile/me
//desc  get current user profile
//acess private
router.get('/me', auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);


        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });

        }
        res.json(profile);
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).send('server error');

    }
    
    res.send(' profile route')
});

//@route api/profile
//desc  create and u[date] profile
//acess private

router.post('/', [auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills are required').not().isEmpty()
]
    
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const {
        company,
        website,
        location,
        bio,
        status,
        gittubusername,
        skills,
        youtube,
        facebook,
        instagram,
        x,
        linkedIn
    } = req.body;
    //build  profile obj
    let profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (gittubusername) profileFields.gittubusername = gittubusername;
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    // console.log(profileFields.skills);
    //build social obj
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (instagram) profileFields.social.instagram = instagram;
    if (x) profileFields.social.x = x;
    if (linkedIn) profileFields.social.linkedIn = linkedIn;
    if (facebook) profileFields.social.facebook = facebook;


    try {
        let profile = await Profile.findOne({ user: req.user.id });
        //console.log(profile)
        if (profile) {
            //update
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
            return res.json(profile);
        }
        //create
        profile = new Profile(profileFields);
        await profile.save();
        return res.json(profile);

    }
    catch (err) {
        console.log(err.message);
        res.status(400).send('server error')
    }
});
//@route api/profile
//desc  get all profiles
router.get('/', async (req, res) => {
    try {
      //  console.log("123");
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        
        res.json(profiles);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('server error');
    }
});
//@route api/profile/user/:user_id
//desc  get profile by id
router.get('/user/:user_id', async (req, res) => {
    try {
        //console.log("123");
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
       // console.log(profile);
        if (!profile) {
            return res.status(400).json({ error: 'No profile found with the provided ID' });
        }
        
        res.json(profile);
    }
    catch (err) {
        console.log(err);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ error: 'No profile found with the provided ID' });
        }
        res.status(500).send('server error');
    }
});

//@route api/profile
//desc  delete profile,user and post
router.delete('/', auth,async (req, res) => {
    try {
        // console.log("123");
        //to remove post


        //to remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        //remove user
        await User.findByIdAndRemove({ _id: req.user.id });
        
        res.json({msg:'user deleted '});
    }
    catch (err) {
        console.log(err);
        res.status(500).send('server error');
    }
});
//@route api/profile/experience
//desc  add profile experience

router.put('/experience', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'company is required').not().isEmpty(),
    check('from', 'from is required').not().isEmpty()

]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title,
        company,
        location, 
        from,
        to,
        current,
        description } = req.body;
    const newExp = {
        title,
        company,
        location, from,
        to,
        current,
        description
    }
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
        
    } catch (err) {
        console.log(err.message);
        res.status(400).send('server-side problem');
        }
    
});

//@route api/profile/experience
//desc  delete profile experience
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
    
       // Find the index of the experience with the specified exp_id
        const expIndex = profile.experience.findIndex(item => item.id === req.params.exp_id);

        if (expIndex === -1) {
            return res.status(404).json({ msg: 'Experience not found' });
        }
        profile.experience.splice(expIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(400).send('server-side problem');
        
    }
});

//@route api/profile/education
//desc  add profile education

router.put('/education', [auth, [
    check('School', 'School is required').not().isEmpty(),
    check('degree', 'degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of study is required').not().isEmpty(),
    check('from', 'from is required').not().isEmpty()

]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { School,
        degree,
        fieldofstudy, 
        from,
        to,
        current,
        description } = req.body;
    const newEdu = {
        School,
        degree,
        fieldofstudy, 
        from,
        to,
        current,
        description
    }
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);
        
    } catch (err) {
        console.log(err.message);
        res.status(400).send('server-side problem');
        }
    
});

//@route api/profile/education
//desc  delete profile education
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
    
       // Find the index of the education with the specified exp_id
        const eduIndex = profile.education.findIndex(item => item.id === req.params.edu_id);

        if (eduIndex === -1) {
            return res.status(404).json({ msg: 'education not found' });
        }
        profile.education.splice(eduIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(400).send('server-side problem');
        
    }
});

module.exports = router;