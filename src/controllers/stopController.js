import Stop from 'models/Stop'

const getAllStops = async (req, res) => {
    try {
        const stops = await Stop.find()
        res.status(200).json(stops)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getStopById = async (req, res) => {
    const { id } = req.params
    try {
        const stop = await Stop.findById(id)
        if (!stop) {
            return res.status(404).json({ message: 'Stop not found' })
        }
        res.status(200).json(stop)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createStop = async (req, res) => {
    const { name, line, location } = req.body
    try {
        if (!name || !line || !location) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const stopExists = await Stop.findOne({ name })
        if (stopExists) {
            return res.status(409).json({ message: 'Stop already exists' })
        }

        const newStop = new Stop({ name, line, location })
        await newStop.save()
        res.status(201).json(newStop)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const updateStop = async (req, res) => {
    const { id } = req.params
    const { name, line, location } = req.body
    try {
        const stop = await Stop.findByIdAndUpdate(
            id,
            { name, line, location },
            { new: true }
        )
        if (!stop) {
            return res.status(404).json({ message: 'Stop not found' })
        }
        res.status(200).json(stop)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const deleteStop = async (req, res) => {
    const { id } = req.params
    try {
        const stop = await Stop.findByIdAndDelete(id)
        if (!stop) {
            return res.status(404).json({ message: 'Stop not found' })
        }
        res.status(200).json({ message: 'Stop deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default { getAllStops, getStopById, createStop, updateStop, deleteStop }
