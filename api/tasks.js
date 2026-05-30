// api/tasks.js (รวม create-task ทั้งหมด)
export default async function handler(req, res) {
  const { platform, ...data } = req.body;
  
  switch(platform) {
    case 'ClickUp':
      break;
    case 'Asana':
      break;
    default:
      return res.status(400).json({ error: 'Unknown platform' });
  }
}
