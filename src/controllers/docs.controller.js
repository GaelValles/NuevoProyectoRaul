import Docs from '../models/docs.model.js'

export const getdocs = async (req,res) => {
    const docs = await Docs.find()
    res.json(docs)
}
export const createdocs = async (req,res) => {
    const { nombre, fechaCreacion, fechaFinal, foto, observaciones, avisoAntelacion} = req.body

    const newDocs = new Docs({
        nombre,
        fechaCreacion,
        fechaFinal,
        foto,
        observaciones,
        avisoAntelacion
    })

    const savedTask = await newDocs.save()
    res.json(savedTask);
}
export const getdoc = async (req,res) => {
    const doc=await Docs.findById(req.params.id)
    
    if(!doc) return res.status(404).json({message: 'Documento no encontrado'})
    res.json(doc) 
}
export const deletedocs = async (req,res) => {
    const doc=await Docs.findByIdAndDelete(req.params.id)
    
    if(!doc) return res.status(404).json({message: 'Documento no encontrado'})
    res.json(doc) 
}
export const updatedocs = async (req,res) => {
    const doc=await Docs.findByIdAndUpdate(req.params.id, req.body, { new:true })
    
    if(!doc) return res.status(404).json({message: 'Documento no encontrado'})
    res.json(doc) 
}