import { Schema, model } from 'mongoose'
import { generateUniqueIdentifier } from '../utils/utils.js'

const userSchema = Schema({
    password: { type: String, required: false, },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    CNIC: { type: String, required: false },
    email: { type: String, required: false, default: '' },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: false },
    role: { type: String, required: true, default: 'client', enum: ['client', 'employee', 'manager', 'super_admin'] },
    // below fields are not related to client (rather to employee,manager)
    salaryType: { type: String, required: false },
    officialNumber: { type: Number, required: false, default: '' },
    gender: { type: String, required: false, enum: ['male', 'female'], default: 'male' },
    martialStatus: { type: String, required: false, enum: ['married', 'single', 'unmarried'], default: 'single' },
    isActive: { type: Boolean, required: false, default: false },
    uid: { type: String },
}, { timestamps: true })


// Before saving a new document, generate a unique readable identifier
userSchema.pre('save', async function (next) {
    if (!this.uid) {
        let isUnique = false;
        let generatedIdentifier;

        while (!isUnique) {
            // Generate a unique identifier (you can use a library for this)
            generatedIdentifier = generateUniqueIdentifier();

            // Check if it's unique in the collection
            const existingDocument = await this.constructor.findOne({ uid: generatedIdentifier });

            if (!existingDocument) {
                isUnique = true; // Identifier is unique, exit the loop
            }
        }

        // Assign the generated identifier to the document
        this.uid = generatedIdentifier;
    }
    next();
});

const userModel = model('User', userSchema)
export default userModel