import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        contactNumber: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
    { 
        timestamps: true,
    }
);

export const Contact = mongoose.model('Contact', contactSchema);