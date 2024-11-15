

const validateJobData = (req, res, next) => {
    const { company, logoUrl, jobPosition, salary, jobType, remoteOffice, location, description, about, skills, information } = req.body;

    if (!company || typeof company !== 'string' || company.trim() === '') {
        return res.status(400).json({ message: 'Invalid company name' });
    }
    if (!jobPosition || typeof jobPosition !== 'string' || jobPosition.trim() === '') {
        return res.status(400).json({ message: 'Invalid job position' });
    }
    if (!salary || typeof salary !== 'string' || salary <= 0) {
        return res.status(400).json({ message: 'Invalid salary' });
    }
    if (!jobType) {
        return res.status(400).json({ message: 'job type is required' });
    }
    if (!remoteOffice) {
        return res.status(400).json({ message: 'remote/office option is required' });
    }
    if (!location || typeof location !== 'string' || location.trim() === '') {
        return res.status(400).json({ message: 'Invalid location' });
    }
    if (!description || typeof description !== 'string' || description.trim() === '') {
        return res.status(400).json({ message: 'Invalid description' });
    }
    if (!about || typeof about !== 'string' || about.trim() === '') {
        return res.status(400).json({ message: 'Invalid about company field' });
    }
    if (!Array.isArray(skills) || skills.some(skill => typeof skill !== 'string')) {
        return res.status(400).json({ message: 'Invalid skills' });
    }
    if (information && typeof information !== 'string') {
        return res.status(400).json({ message: 'Invalid additional information' });
    }

    next();
};



module.exports = validateJobData