import Doc from "../models/docs.model.js"

export const getdocs = async (req,res) => {
    const docs = await Doc.find({
        user: req.user.id
    }).populate('user')
    res.json(docs)
}
export const createdocs = async (req,res) => {
    const { nombre, fechaCreacion, fechaFinal, foto, descripcion, avisoAntelacion} = req.body

    const newDoc = new Doc({
        nombre,
        fechaCreacion,
        fechaFinal,
        foto,
        descripcion,
        avisoAntelacion,
        user:req.user.id
    })

    const savedTask = await newDoc.save()
    res.json(savedTask);
}
export const getdoc = async (req,res) => {
    const doc=await Doc.findById(req.params.id)
    
    if(!doc) return res.status(404).json({message: 'Documento no encontrado'})
    res.json(doc) 
}
export const deletedocs = async (req,res) => {
    const doc=await Doc.findByIdAndDelete(req.params.id)
    
    if(!doc) return res.status(404).json({message: 'Documento no encontrado'})
    res.json(doc) 
}
export const updatedocs = async (req,res) => {
    const doc=await Doc.findByIdAndUpdate(req.params.id, req.body, { new:true })
    
    if(!doc) return res.status(404).json({message: 'Documento no encontrado'})
    res.json(doc) 
}