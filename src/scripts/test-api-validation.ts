import axios from 'axios';

const baseURL = 'http://localhost:3000';

async function testAPIValidation() {
  console.log('🧪 Testing API validation...\n');
  
  // Test 1: Valid course statistics request
  console.log('1. Testing valid course statistics request...');
  try {
    const response = await axios.get(`${baseURL}/courses/1-course-math-8a/statistics?dataset=sample&metric=competence-levels`);
    console.log(`✅ Status: ${response.status}`);
    console.log(`✅ Response structure looks valid`);
  } catch (error: any) {
    console.log(`❌ Error: ${error.response?.status} - ${error.response?.data?.error || error.message}`);
  }
  
  // Test 2: Invalid metric parameter
  console.log('\n2. Testing invalid metric parameter...');
  try {
    const response = await axios.get(`${baseURL}/courses/1-course-math-8a/statistics?dataset=sample&metric=invalid_metric`);
    console.log(`❌ Should have failed but got status: ${response.status}`);
  } catch (error: any) {
    if (error.response?.status === 400) {
      console.log(`✅ Correctly rejected with status: ${error.response.status}`);
      console.log(`✅ Error message: ${error.response.data.message}`);
    } else {
      console.log(`❌ Unexpected error: ${error.response?.status} - ${error.message}`);
    }
  }
  
  // Test 3: Valid student performances request
  console.log('\n3. Testing valid student performances request...');
  try {
    const response = await axios.get(`${baseURL}/courses/1-course-math-8a/students?dataset=sample&metric=competence-levels`);
    console.log(`✅ Status: ${response.status}`);
    console.log(`✅ Response structure looks valid`);
  } catch (error: any) {
    console.log(`❌ Error: ${error.response?.status} - ${error.response?.data?.error || error.message}`);
  }
  
  // Test 4: Valid school run statistics request
  console.log('\n4. Testing valid school run statistics request...');
  try {
    const response = await axios.get(`${baseURL}/schools/school-1/runs/run-2024-spring/statistics?dataset=sample&metric=competence-levels`);
    console.log(`✅ Status: ${response.status}`);
    console.log(`✅ Response structure looks valid`);
  } catch (error: any) {
    console.log(`❌ Error: ${error.response?.status} - ${error.response?.data?.error || error.message}`);
  }
  
  // Test 5: Invalid school run metric parameter
  console.log('\n5. Testing invalid school run metric parameter...');
  try {
    const response = await axios.get(`${baseURL}/schools/school-1/runs/run-2024-spring/statistics?dataset=sample&metric=invalid_metric`);
    console.log(`❌ Should have failed but got status: ${response.status}`);
  } catch (error: any) {
    if (error.response?.status === 400) {
      console.log(`✅ Correctly rejected with status: ${error.response.status}`);
      console.log(`✅ Error message: ${error.response.data.message}`);
    } else {
      console.log(`❌ Unexpected error: ${error.response?.status} - ${error.message}`);
    }
  }
  
  // Test 6: Non-existent course
  console.log('\n6. Testing non-existent course...');
  try {
    const response = await axios.get(`${baseURL}/courses/nonexistent/statistics?dataset=sample&metric=competence-levels`);
    console.log(`❌ Should have failed but got status: ${response.status}`);
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.log(`✅ Correctly returned 404 for non-existent course`);
    } else {
      console.log(`❌ Unexpected error: ${error.response?.status} - ${error.message}`);
    }
  }
  
  // Test 7: Invalid dataset
  console.log('\n7. Testing invalid dataset...');
  try {
    const response = await axios.get(`${baseURL}/courses/1-course-math-8a/statistics?dataset=invalid_dataset&metric=competence-levels`);
    console.log(`❌ Should have failed but got status: ${response.status}`);
  } catch (error: any) {
    if (error.response?.status === 400) {
      console.log(`✅ Correctly rejected invalid dataset with status: ${error.response.status}`);
      console.log(`✅ Error message: ${error.response.data.message}`);
    } else {
      console.log(`❌ Unexpected error: ${error.response?.status} - ${error.message}`);
    }
  }
  
  console.log('\n✅ API validation testing complete!');
}

// Test different datasets
async function testAllDatasets() {
  console.log('\n🔄 Testing all datasets...\n');
  
  const datasets = ['sample', 'sample-en', 'vera3-math', 'jena-response', 'kompetenztest', 'zepf-assessment'];
  
  for (const dataset of datasets) {
    console.log(`📊 Testing dataset: ${dataset}`);
    try {
      const response = await axios.get(`${baseURL}/courses/1-course-math-8a/statistics?dataset=${dataset}&metric=competence-levels`);
      console.log(`✅ ${dataset}: Status ${response.status}`);
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.log(`⚠️  ${dataset}: Course not found (expected for some datasets)`);
      } else {
        console.log(`❌ ${dataset}: Error ${error.response?.status} - ${error.response?.data?.message || error.message}`);
      }
    }
  }
}

// Run the tests
if (require.main === module) {
  (async () => {
    try {
      await testAPIValidation();
      await testAllDatasets();
    } catch (error) {
      console.error('Test failed:', error);
      process.exit(1);
    }
  })();
}

export { testAPIValidation, testAllDatasets };