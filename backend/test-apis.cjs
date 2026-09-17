// Backend API comprehensive test script (CommonJS for node)
const BASE = 'http://localhost:5000/api';

async function req(path, opts = {}) {
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    method: opts.method || 'GET',
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  let data = null;
  const text = await res.text();
  try { data = JSON.parse(text); } catch { data = text; }
  return { status: res.status, ok: res.ok, data };
}

async function main() {
  let token = null;
  const results = [];
  const add = (name, status, detail = '') => results.push({ name, status, detail });

  // ---- AUTH ----
  console.log('\n=== AUTH TESTS ===');

  let r = await req('/auth/login', { method: 'POST', body: { email: 'admin@sciencelearn.com', password: 'Admin@123' } });
  console.log('Admin login:', r.status, r.data);
  add('Admin login (correct credentials)', r.status === 200 ? 'PASS' : 'FAIL', r.status + ' ' + (r.data?.message || r.data?.error || ''));
  if (r.ok && r.data?.token) token = r.data.token;
  const adminUser = r.data?.user || null;
  add('Admin user has role=admin', adminUser?.role === 'admin' ? 'PASS' : 'FAIL', 'role=' + (adminUser?.role || 'null'));

  r = await req('/auth/login', { method: 'POST', body: { email: 'wrong@x.com', password: 'wrong' } });
  console.log('Bad login:', r.status);
  add('Login with wrong credentials returns 4xx', r.status >= 400 && r.status < 500 ? 'PASS' : 'FAIL', 'status=' + r.status);

  const newEmail = 'teststudent' + Date.now() + '@test.com';
  r = await req('/auth/register', { method: 'POST', body: { full_name: 'Test Student', email: newEmail, password: 'Test@1234' } });
  console.log('Register:', r.status, r.data);
  add('Register new student', r.status === 201 || r.status === 200 ? 'PASS' : 'FAIL', r.status + ' ' + (r.data?.message || r.data?.error || ''));

  r = await req('/auth/login', { method: 'POST', body: { email: newEmail, password: 'Test@1234' } });
  add('New student can login', r.status === 200 ? 'PASS' : 'FAIL', 'status=' + r.status);
  const studentToken = r.data?.token || null;

  r = await req('/auth/me', { headers: token ? { Authorization: `Bearer ${token}` } : {} });
  console.log('/me admin:', r.status, r.data);
  add('GET /auth/me with admin token', r.status === 200 ? 'PASS' : 'FAIL', 'status=' + r.status);

  r = await req('/auth/me');
  add('GET /auth/me without token returns 401', r.status === 401 ? 'PASS' : 'FAIL', 'status=' + r.status);

  // ---- USERS CRUD (admin) ----
  console.log('\n=== USERS CRUD ===');
  const authH = { Authorization: `Bearer ${token}` };
  const studentAuthH = { Authorization: `Bearer ${studentToken}` };

  r = await req('/users', { headers: authH });
  console.log('GET /users:', r.status, Array.isArray(r.data) ? r.data.length : (r.data?.users?.length || typeof r.data));
  add('Admin GET /users returns array', (Array.isArray(r.data) || Array.isArray(r.data?.users)) ? 'PASS' : 'FAIL', 'status=' + r.status + ' type=' + typeof r.data);

  r = await req('/users', { headers: studentAuthH });
  add('Student GET /users returns 403', r.status === 403 ? 'PASS' : 'FAIL', 'status=' + r.status);

  r = await req('/users/stats', { headers: authH });
  console.log('GET /users/stats:', r.status, r.data);
  add('Admin GET /users/stats returns numeric stats', r.status === 200 && r.data ? 'PASS' : 'FAIL', 'status=' + r.status + ' keys=' + Object.keys(r.data || {}).join(','));

  const newUserEmail = 'newuser' + Date.now() + '@test.com';
  r = await req('/users', { method: 'POST', headers: authH, body: { full_name: 'New User', email: newUserEmail, password: 'Test@1234', role: 'student', is_active: true } });
  console.log('POST /users create:', r.status, r.data);
  add('Admin create user', r.status === 201 || r.status === 200 ? 'PASS' : 'FAIL', r.status + ' ' + (r.data?.message || r.data?.error || ''));
  const newUserId = r.data?.user?.id || r.data?.id || r.data?.user?._id || null;
  add('Created user has id field', !!newUserId ? 'PASS' : 'FAIL', 'id=' + newUserId);

  if (newUserId) {
    r = await req('/users/' + newUserId, { method: 'PUT', headers: authH, body: { full_name: 'Updated User' } });
    add('Admin update user', r.status === 200 ? 'PASS' : 'FAIL', 'status=' + r.status + ' ' + (r.data?.message || r.data?.error || ''));
    add('Updated user name matches', (r.data?.user?.full_name === 'Updated User' || r.data?.full_name === 'Updated User') ? 'PASS' : 'FAIL');

    r = await req('/users/' + newUserId + '/toggle-active', { method: 'PUT', headers: authH });
    add('Toggle user active status', r.status === 200 ? 'PASS' : 'FAIL', 'status=' + r.status + ' is_active=' + (r.data?.user?.is_active ?? r.data?.is_active));

    r = await req('/users/' + newUserId, { method: 'DELETE', headers: authH });
    add('Admin delete user', r.status === 200 ? 'PASS' : 'FAIL', 'status=' + r.status + ' ' + (r.data?.message || r.data?.error || ''));
  }

  // ---- LESSONS ----
  console.log('\n=== LESSONS ===');
  r = await req('/lessons');
  console.log('GET /lessons public:', r.status, Array.isArray(r.data) ? r.data.length : '');
  add('Public GET /lessons returns array', r.status === 200 && Array.isArray(r.data) ? 'PASS' : 'FAIL', 'status=' + r.status);
  const lessons = r.data || [];
  const firstLessonId = lessons[0]?.id || lessons[0]?._id || null;

  if (firstLessonId) {
    r = await req('/lessons/' + firstLessonId);
    add('GET /lessons/:id returns lesson', r.status === 200 ? 'PASS' : 'FAIL', 'status=' + r.status);
  }

  const lessonTitle = 'Test Lesson ' + Date.now();
  r = await req('/lessons', { method: 'POST', headers: authH, body: { title: lessonTitle, category: 'Biology', content: '# Test\nContent here.', difficulty: 'Beginner' } });
  console.log('POST /lessons:', r.status, r.data);
  add('Admin create lesson', r.status === 201 ? 'PASS' : 'FAIL', r.status + ' ' + (r.data?.message || r.data?.error || ''));
  const createdLessonId = r.data?.lesson?.id || r.data?.id || null;

  if (createdLessonId) {
    r = await req('/lessons/' + createdLessonId, { method: 'PUT', headers: authH, body: { title: 'Updated ' + lessonTitle } });
    add('Admin update lesson', r.status === 200 ? 'PASS' : 'FAIL', 'status=' + r.status);
    r = await req('/lessons/' + createdLessonId, { method: 'DELETE', headers: authH });
    add('Admin delete lesson', r.status === 200 ? 'PASS' : 'FAIL', 'status=' + r.status);
  }

  // ---- QUIZZES ----
  console.log('\n=== QUIZZES ===');
  r = await req('/quizzes');
  console.log('GET /quizzes public:', r.status, Array.isArray(r.data) ? r.data.length : '');
  add('Public GET /quizzes returns array', r.status === 200 && Array.isArray(r.data) ? 'PASS' : 'FAIL', 'status=' + r.status);
  const quizzes = r.data || [];
  let quizId = quizzes.find(q => (q.questions?.length || 0) >= 1)?.id || quizzes.find(q => (q.questions?.length || 0) >= 1)?._id || null;

  if (!quizId) {
    const qz = await req('/quizzes', { method: 'POST', headers: authH, body: { title: 'Test Quiz ' + Date.now(), category: 'Biology', difficulty: 'Beginner', pass_percentage: 80, questions: [{ question_text: 'What is 2+2?', options: [{ option_text: '3', is_correct: false }, { option_text: '4', is_correct: true }, { option_text: '5', is_correct: false }, { option_text: '6', is_correct: false }], explanation: 'Basic math.' }] } });
    console.log('Created test quiz:', qz.status);
    quizId = qz.data?.quiz?.id || qz.data?.id || null;
    add('Admin can create quiz', qz.status === 201 ? 'PASS' : 'FAIL', 'status=' + qz.status);
  }

  if (quizId) {
    r = await req('/quizzes/' + quizId);
    add('GET /quizzes/:id returns quiz with questions array', r.status === 200 && Array.isArray(r.data?.questions || r.data?.quiz?.questions) ? 'PASS' : 'FAIL', 'status=' + r.status);
    const q = r.data?.quiz || r.data;
    const firstQ = (q?.questions || [])[0];
    const correctOption = firstQ?.options?.find(o => o.is_correct) || firstQ?.options?.[1];
    const answers = [{ questionId: String(firstQ?.id || firstQ?._id), optionId: String(correctOption?.id || correctOption?._id) }];
    r = await req('/quizzes/' + quizId + '/submit', { method: 'POST', headers: studentAuthH, body: { answers } });
    console.log('Submit quiz:', r.status, r.data);
    add('Student can submit quiz and get result with percentage', (r.status === 200 || r.status === 201) && (r.data?.result != null || r.data?.percentage != null) ? 'PASS' : 'FAIL', 'status=' + r.status + ' msg=' + (r.data?.message || r.data?.error || ''));
    const resultId = r.data?.result?.id || r.data?.id || r.data?.resultId || null;
    if (resultId) {
      r = await req('/quizzes/results/' + resultId, { headers: studentAuthH });
      add('GET /quizzes/results/:id returns result', r.status === 200 ? 'PASS' : 'FAIL', 'status=' + r.status);
    }
  }

  // ---- TIPS ----
  console.log('\n=== TIPS ===');
  r = await req('/tips');
  add('Public GET /tips returns array', r.status === 200 && Array.isArray(r.data) ? 'PASS' : 'FAIL', 'status=' + r.status);

  const tipTitle = 'Test Tip ' + Date.now();
  r = await req('/tips', { method: 'POST', headers: authH, body: { title: tipTitle, category: 'Biology', content: 'Some content here for the science tip.', difficulty: 'Beginner' } });
  console.log('POST /tips:', r.status, r.data);
  add('Admin create tip', r.status === 201 ? 'PASS' : 'FAIL', r.status + ' ' + (r.data?.message || r.data?.error || ''));
  const tipId = r.data?.tip?.id || r.data?.id || null;

  if (tipId) {
    r = await req('/tips/' + tipId, { method: 'PUT', headers: authH, body: { title: 'Updated ' + tipTitle } });
    add('Admin update tip', r.status === 200 ? 'PASS' : 'FAIL', 'status=' + r.status);
    r = await req('/tips/' + tipId, { method: 'DELETE', headers: authH });
    add('Admin delete tip', r.status === 200 ? 'PASS' : 'FAIL', 'status=' + r.status);
  }

  // ---- CERTIFICATES ----
  console.log('\n=== CERTIFICATES ===');
  r = await req('/certificates/requests', { headers: studentAuthH });
  add('Student GET /certificates/requests returns array', r.status === 200 && Array.isArray(r.data) ? 'PASS' : 'FAIL', 'status=' + r.status + ' type=' + typeof r.data);

  r = await req('/certificates/admin/requests', { headers: authH });
  add('Admin GET /certificates/admin/requests returns array', r.status === 200 && Array.isArray(r.data) ? 'PASS' : 'FAIL', 'status=' + r.status);

  // Print pass/fail summary
  console.log('\n\n========= TEST SUMMARY =========');
  const pass = results.filter(r => r.status === 'PASS').length;
  const fail = results.filter(r => r.status === 'FAIL').length;
  results.forEach(r => console.log(`[${r.status}] ${r.name}${r.detail ? ' — ' + r.detail : ''}`));
  console.log(`\nTotal: ${results.length}, PASS: ${pass}, FAIL: ${fail}`);
  console.log(fail === 0 ? '\n✅ ALL TESTS PASSED' : `\n❌ ${fail} TEST(S) FAILED`);
  process.exit(fail === 0 ? 0 : 1);
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
