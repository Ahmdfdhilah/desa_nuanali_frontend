export default async function handler(req, res) {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/agendas`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from backend' });
    }
}
