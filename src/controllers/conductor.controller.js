import Conductor from "../models/conductor.model.js"

export const getConductores = async (req,res) => {
    const conductor = await Conductor.find({
        user: req.user.id
    }).populate('user')
    res.json(conductor)
}
export const registrarConductor = async (req,res) => {
    const { nombre, fechaNacimiento, numLicencia, numVisa, numGafete, solicitud, antidoping, antecedentes, ine, visa, fast, domicilio, psicofisico, aduana} = req.body

    const newConductor = new Conductor({
        nombre,
        fechaNacimiento,
        numLicencia, 
        numVisa, 
        numGafete, 
        solicitud, 
        antidoping, 
        antecedentes, 
        ine, 
        visa, 
        fast, 
        domicilio, 
        psicofisico, 
        aduana,
        user: req.user.id
    })

    const savedConductor = await newConductor.save()
    res.json(savedConductor);
}
export const getConductor = async (req,res) => {
    const conductor=await Conductor.findById(req.params.id)
    
    if(!conductor) return res.status(404).json({message: 'Documento no encontrado'})
    res.json(conductor) 
}
export const deleteConductor = async (req,res) => {
    const conductor=await Conductor.findByIdAndDelete(req.params.id)
    
    if(!conductor) return res.status(404).json({message: 'Documento no encontrado'})
    return res.sendStatus(204);
}
export const updateConductor = async (req,res) => {
    const conductor=await Conductor.findByIdAndUpdate(req.params.id, req.body, { new:true })
    
    if(!conductor) return res.status(404).json({message: 'Documento no encontrado'})
    res.json(conductor) 
}