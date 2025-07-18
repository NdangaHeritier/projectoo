import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

export default async function handler(req, res) {
  const { projectId } = req.query;

  try {
    // Only use projectId to fetch data
    const projectDoc = await db.collection('projects').doc(projectId).get();

    if (!projectDoc.exists) {
      return res.status(404).send('Project not found');
    }

    const project = projectDoc.data();
    const title = project.title || 'Shared Project';
    const description = project.description || 'A shared project plan';
    
    res.setHeader('Content-Type', 'text/html');
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>${title}</title>
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:image" content="img.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://project-oo.vercel.app/shared/projects/4Xt5oHur73b4dnxc6f4G4J7/share/${projectId}" />
      </head>
      <body>
        <script>
          window.location.href = "/shared/projects/4Xt5oHur73b4dnxc6f4G4J7/share/${projectId}";
        </script>
        <noscript>
          <meta http-equiv="refresh" content="0; URL=/shared/projects/4Xt5oHur73b4dnxc6f4G4J7/share/${projectId}" />
        </noscript>
      </body>
      </html>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
}