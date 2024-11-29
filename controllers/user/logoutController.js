const logout  = async (req, res) => {
    try {
        res.clearCookie(process.env.USER_ID, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        });
        
        res.redirect('/');
    } catch (error) {
        console.error('Error logging out:', error);
        res.redirect('/');
    }
};

module.exports = { logout };