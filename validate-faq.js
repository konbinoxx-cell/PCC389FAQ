// validate-faq.js - 用于验证 faq.json 格式
const fs = require('fs');

try {
  const data = fs.readFileSync('./faq.json', 'utf8');
  const faqData = JSON.parse(data);
  
  console.log('✅ FAQ JSON is valid!');
  console.log(`📊 Found ${faqData.length} FAQ entries`);
  
  faqData.forEach((item, index) => {
    console.log(`\nEntry ${index + 1}:`);
    console.log(`  ID: ${item.id}`);
    console.log(`  Question: ${item.question.substring(0, 50)}...`);
    console.log(`  Category: ${item.category}`);
    console.log(`  Date: ${item.date}`);
  });
  
} catch (error) {
  console.error('❌ Invalid FAQ JSON:', error.message);
  process.exit(1);
}
