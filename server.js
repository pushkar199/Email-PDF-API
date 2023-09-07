const express = require('express');
const app = express();
const path = require('path');
const pdf = require('html-pdf-node');
const axios = require('axios');
const fs = require('fs').promises;

app.use(express.json());

const PORT = process.env.PORT || 3000;
const SENDINBLUE_API_KEY = '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';

app.post('/generate-pdf-email', async (req, res) => {
  try {
    const {test1, test2, test3, test4, test5, test6, test7, test8, test9, test10, test11, test12, test13, test14, test15, test16, test17, test18, test19, test20, test21, test22, test23, test24, test25, test26, test27, test28, test29, test30, test31, test32, test33, test34, test35, test36, test37, test38, test39, test40, test41, test42, test43, test44, test45, test46, test47, test48, test49, test50, test51, test52, test53, test54, test55, test56, test57, test58, test59, test60, test61, test62, test63, test64, test65, test66, recipientEmail } = req.body;
    

  

    // Read the HTML template file
    const htmlTemplate = await readFileAsync(path.join(__dirname, 'index.html'), 'utf8');

    // Replace placeholders in the HTML template with actual data
    const populatedHtml = populateTemplate(htmlTemplate, { test1, test2, test3, test4, test5, test6, test7, test8, test9, test10, test11, test12, test13, test14, test15, test16, test17, test18, test19, test20, test21, test22, test23, test24, test25, test26, test27, test28, test29, test30, test31, test32, test33, test34, test35, test36, test37, test38, test39, test40, test41, test42, test43, test44, test45, test46, test47, test48, test49, test50, test51, test52, test53, test54, test55, test56, test57, test58, test59, test60, test61, test62, test63, test64, test65, test66, recipientEmail });

    // Generate PDF
    const pdfBuffer = await pdf.generatePdf({
      content: populatedHtml,
    }, {
      format: 'A4',
      path: 'report.pdf',
    });

    // Sender and recipient details
    const senderName = 'Pushkar Thakur';
    const senderEmail = 'thaturpushkar99@gmail.com';
    const subject = 'Calculator results for home construction';

    // Send the PDF as an email attachment using SendinBlue API
    const response = await axios.post(
      'https://api.sendinblue.com/v3/smtp/email',
      {
        sender: { name: senderName, email: senderEmail },
        to: [{ email: recipientEmail }],
        subject: subject,
        htmlContent: `<html>
        <head>
          <style>
            /* Remove margin and padding for <p> elements */
            p {
              margin: 0;
              padding: 0;
            }
          </style>
        </head>
        <body>
        <p>Greetings,</p>
        <p style = "margin-top:0px;">Thank you for using our calculator. The result copy for construction cost calculator is attached to this email.</p><br>
        <p><strong>Aapka, Naye Zamane ka Architect & Contractor.</strong></p>
        <p>☑ No surprises</p>
        <p>☑ Better design & construction</p> 
        <p>☑ Largest in Delhi NCR</p><br>
        <p>Visit our <a href="https://www.prithu.in/">website</a> to know more about how homes built by Prithu will be better for you.</p><br>
        <p><strong>Services offered by Prithu:</strong></p>
        <p><a href="https://www.prithu.in/turnkey-home-design-and-construction-in-delhi-ncr">Turnkey Service</a> | <a href="https://www.prithu.in/plot-collaboration-delhi">Plot Collaboration</a> | <a href="https://www.prithu.in/buy-floors">Buy Floor</a></p><br>
        <p><strong>See Our Projects:</strong></p>
        <p><a href="https://www.prithu.in/villas">Villa Projects</a> | <a href="https://www.prithu.in/duplex-simplex-combo">Simplex Duplex combos</a> | <a href="https://www.prithu.in/independent-floors">Builder floors</a></p><br>
        <p>See how you can <a href="https://www.youtube.com/watch?v=gn7etKcwv3U&list=TLGGOQpGyW3Vk8QwMTA5MjAyMw&t=85s&ab_channel=PrithuHomes">save money with Prithu</a></p>
        <p><a href="https://www.prithu.in/blog">What's New</a> at Prithu</p><br>
        <p>Best Regards,</p>
        <p>Prithu Homes</p><br>
        <p>15D, Atma Ram House,</p>
        <p>1 Tolstoy Marg, Barakhamba Rd,</p>
        <p>110001, Delhi</p>
        </body>
        </html>`,
        attachment: [
          {
            content: pdfBuffer.toString('base64'),
            name: 'report.pdf',
          },
        ],
      },
      {
        headers: {
          'api-key': SENDINBLUE_API_KEY,
        },
      }
    );

    console.log('Email sent:', response.data);

    res.send('PDF generated and email sent successfully.');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Utility function to read a file asynchronously
async function readFileAsync(filePath, encoding) {
  try {
    const data = await fs.readFile(filePath, encoding);
    return data;
  } catch (error) {
    throw error;
  }
}

// Utility function to populate placeholders in the HTML template
function populateTemplate(template, data) {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const placeholder = `{{${key}}}`;
      template = template.replace(new RegExp(placeholder, 'g'), data[key]);
    }
  }
  return template;
}
