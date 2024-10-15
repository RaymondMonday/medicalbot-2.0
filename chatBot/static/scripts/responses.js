function getBotResponse(input) {
    
    if (input.includes("headache")) {
        return "It could be due to various reasons such as tension, dehydration, or sinus issues. Make sure to drink water and rest.";
    } else if (input.includes("fever")) {
        return "Fever might indicate an underlying infection. Monitor your temperature and consider seeing a doctor if it persists.";
    } else if (input.includes("cough")) {
        return "Coughing might be a sign of a cold, flu, or respiratory infection. If it worsens, consult a medical professional.";
    } else if (input.includes("stomach pain")) {
        return "Stomach pain can be caused by indigestion, gastritis, or other issues. If it's severe or persistent, seek medical advice.";
    }
    // Simple medical responses                
    if (input.includes("hello")) {
        return "Hello! How can I assist you with your medical concerns today?";
    } else if (input.includes("hey") || input.includes("hi")) {
        return "Hello! How can I help you?";
    } else if (input.includes("goodbye")) {
        return "Take care of yourself. If you have more questions, feel free to ask later!";
    } else {
        return "I'm here to help with medical-related questions. If you're experiencing symptoms, please describe them for more accurate assistance.";
    }
}