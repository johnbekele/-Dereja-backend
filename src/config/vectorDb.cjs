// // Change to .cjs file or use require
// const { Pinecone } = require("@pinecone-database/pinecone");
// const { GoogleGenerativeAI } = require('@google/generative-ai');

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);
// const model = genAI.getGenerativeModel({ model: 'embedding-001' });

// const pinecone = new Pinecone({
//   apiKey: process.env.PINECONE_API_KEY,
// });

// const initPinecone = async () => {
//   try {
//     return pinecone.Index("kb-index");
//   } catch (error) {
//     console.log('Error accessing index:', error.message);
//     throw error;
//   }
// }

// const createIndex = async () => {
//   console.log("checking vector index");
//   try {
//     // Try to access index first
//     const index = pinecone.Index("kb-index");
//     await index.describeIndexStats();
//     console.log('Index already exists and accessible');
//   } catch (error) {
//     if (error.message.includes('404')) {
//       console.log('Creating new index...');
//       await pinecone.createIndex({
//         name: 'kb-index',
//         dimension: 768,
//         metric: 'cosine',
//         spec: {
//           serverless: {
//             cloud: 'aws',
//             region: 'us-east-1'
//           }
//         }
//       });
//       console.log('Index created successfully');
//     } else {
//       console.log('Index access error:', error.message);
//     }
//   }
// };

// const getEmbedding = async (text) => {
//   const result = await model.embedContent(text);
//   return result.embedding.values;
// }

// module.exports = { initPinecone, getEmbedding ,createIndex};