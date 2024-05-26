import mongoose from 'mongoose'

export const connecToDatabase = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@taskmanager.cd7shoy.mongodb.net/?retryWrites=true&w=majority&appName=TaskManager`)
    console.log('Connected to MongoDB')
}