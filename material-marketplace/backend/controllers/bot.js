const { sendMessageToOpenAI } = require("../openAI");

const botEndpoint = async (req, res) => {
    
    try {
        const userMessage = req.body.message;
        const botResponse = await sendMessageToOpenAI(userMessage);
        res.json({response: botResponse});
    } catch (error) {
        res.status(500).json({ error: 'An error occured while processing your request.'});

    }
};

module.exports = {
    botEndpoint
};