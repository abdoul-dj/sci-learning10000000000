import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import Category from "../models/Category.js";
import Lesson from "../models/Lesson.js";
import Quiz from "../models/Quiz.js";
import Tip from "../models/Tip.js";
import { logger } from "../utils/logger.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../../.env") });

async function seed() {
  await connectDB();

  const categoryNames = [
    "Biology",
    "Chemistry",
    "Physics",
    "Health",
    "Science",
    "Environment",
    "Biotechnology",
  ];

  for (const name of categoryNames) {
    await Category.updateOne({ name }, { $setOnInsert: { name } }, { upsert: true });
  }

  const adminEmail = "admin@sciencelearn.com";
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const hash = await bcrypt.hash("Admin@123", 10);
    await User.create({
      full_name: "Administrator",
      email: adminEmail,
      password_hash: hash,
      role: "admin",
    });
    logger.info("Admin user created");
  }

  const studentEmail = "student@sciencelearn.com";
  const existingStudent = await User.findOne({ email: studentEmail });
  if (!existingStudent) {
    const studentHash = await bcrypt.hash("Student@123", 10);
    await User.create({
      full_name: "Demo Student",
      email: studentEmail,
      password_hash: studentHash,
      role: "student",
    });
    logger.info("Student user created");
  }

  const catMap = {};
  const cats = await Category.find();
  for (const cat of cats) {
    catMap[cat.name] = cat._id;
  }

  if ((await Lesson.countDocuments()) === 0) {
    await Lesson.insertMany([
      {
        title: "Respiration in Human Beings",
        description: "Learn how the human respiratory system works.",
        category: catMap.Biology,
        content: `<h2>Introduction to Respiration</h2>
<p>Respiration is the process by which organisms exchange gases with their environment. In humans, this involves breathing in oxygen and breathing out carbon dioxide.</p>
<h3>The Respiratory System</h3>
<p>The human respiratory system includes the nose, pharynx, larynx, trachea, bronchi, and lungs. Air enters through the nose where it is filtered, warmed, and moistened.</p>
<h3>The Breathing Process</h3>
<p>During inhalation, the diaphragm contracts and moves downward, expanding the chest cavity. Air rushes into the lungs. During exhalation, the diaphragm relaxes, pushing air out.</p>
<h3>Gas Exchange</h3>
<p>Oxygen diffuses from the alveoli into the blood, while carbon dioxide diffuses from the blood into the alveoli to be exhaled.</p>`,
        image_url: "https://cdn-icons-png.flaticon.com/512/2966/2966488.png",
      },
      {
        title: "Organic Chemistry Basics",
        description: "Introduction to organic compounds and their properties.",
        category: catMap.Chemistry,
        content: `<h2>What is Organic Chemistry?</h2>
<p>Organic chemistry is the study of carbon-containing compounds. Carbon's ability to form four covalent bonds makes it the foundation of all living matter.</p>
<h3>Hydrocarbons</h3>
<p>Hydrocarbons contain only carbon and hydrogen. They include alkanes, alkenes, and alkynes based on their bonding patterns.</p>
<h3>Functional Groups</h3>
<p>Functional groups like alcohols (-OH), carboxylic acids (-COOH), and amines (-NH2) determine the chemical properties of organic molecules.</p>`,
        image_url: "https://cdn-icons-png.flaticon.com/512/2784/2784445.png",
      },
      {
        title: "Human Body Systems",
        description: "Overview of major body systems and their functions.",
        category: catMap.Biology,
        content: `<h2>Major Body Systems</h2>
<p>The human body is organized into several interconnected systems that work together to maintain life.</p>
<h3>Circulatory System</h3>
<p>Transports blood, nutrients, oxygen, and waste throughout the body via the heart and blood vessels.</p>
<h3>Digestive System</h3>
<p>Breaks down food into nutrients that can be absorbed and used by the body.</p>
<h3>Nervous System</h3>
<p>Controls and coordinates body activities through electrical signals.</p>`,
        image_url: "https://cdn-icons-png.flaticon.com/512/4320/4320337.png",
      },
    ]);
  }

  if ((await Quiz.countDocuments()) === 0) {
    await Quiz.create({
      title: "Respiration in Human Beings Quiz",
      description: "Test your understanding of the respiratory system.",
      category: catMap.Biology,
      difficulty: "Easy",
      duration_minutes: 30,
      questions: [
        {
          question_text: "Which organ is primarily responsible for gas exchange in humans?",
          explanation: "The alveoli in the lungs are where gas exchange occurs.",
          order_index: 0,
          options: [
            { option_text: "Heart", is_correct: false },
            { option_text: "Lungs", is_correct: true },
            { option_text: "Liver", is_correct: false },
            { option_text: "Kidney", is_correct: false },
          ],
        },
        {
          question_text: "What gas do humans inhale for cellular respiration?",
          explanation: "Oxygen is required for aerobic cellular respiration.",
          order_index: 1,
          options: [
            { option_text: "Carbon dioxide", is_correct: false },
            { option_text: "Nitrogen", is_correct: false },
            { option_text: "Oxygen", is_correct: true },
            { option_text: "Hydrogen", is_correct: false },
          ],
        },
        {
          question_text: "Which muscle helps in the breathing process?",
          explanation: "The diaphragm contracts during inhalation.",
          order_index: 2,
          options: [
            { option_text: "Biceps", is_correct: false },
            { option_text: "Diaphragm", is_correct: true },
            { option_text: "Quadriceps", is_correct: false },
            { option_text: "Deltoid", is_correct: false },
          ],
        },
        {
          question_text: "What is expelled during exhalation?",
          explanation: "Carbon dioxide is a waste product of cellular respiration.",
          order_index: 3,
          options: [
            { option_text: "Oxygen", is_correct: false },
            { option_text: "Carbon dioxide", is_correct: true },
            { option_text: "Nitrogen", is_correct: false },
            { option_text: "Helium", is_correct: false },
          ],
        },
        {
          question_text: "Where does gas exchange occur in the lungs?",
          explanation: "Alveoli are tiny air sacs where gas exchange happens.",
          order_index: 4,
          options: [
            { option_text: "Bronchi", is_correct: false },
            { option_text: "Trachea", is_correct: false },
            { option_text: "Alveoli", is_correct: true },
            { option_text: "Larynx", is_correct: false },
          ],
        },
      ],
    });
  }

  if ((await Tip.countDocuments()) === 0) {
    await Tip.insertMany([
      {
        title: "Active Recall",
        content:
          "Test yourself on key concepts instead of rereading notes. Active recall strengthens memory pathways and improves long-term retention.",
        category: catMap.Science,
        read_time: "3 min read",
      },
      {
        title: "Concept Mapping",
        content:
          "Create visual maps to connect ideas and improve understanding. Link related concepts in biology, chemistry, and physics to see the bigger picture.",
        category: catMap.Biology,
        read_time: "4 min read",
      },
      {
        title: "Understand, Don't Memorize",
        content:
          "Focus on understanding concepts rather than memorizing facts. When you understand the 'why', you can apply knowledge to new situations.",
        category: catMap.Chemistry,
        read_time: "3 min read",
      },
      {
        title: "Practice Regularly",
        content:
          "Consistent practice helps reinforce what you've learned. Short daily study sessions are more effective than cramming before exams.",
        category: catMap.Health,
        read_time: "2 min read",
      },
      {
        title: "Past Papers",
        content:
          "Solve previous years' papers to get familiar with exam patterns. This builds confidence and reveals knowledge gaps.",
        category: catMap.Physics,
        read_time: "5 min read",
      },
    ]);
  }

  logger.info("Database seed completed");
  process.exit(0);
}

seed().catch((err) => {
  logger.error("Database seed failed");
  if (err?.message === "MONGODB_URI is not set") {
    logger.error("Set MONGODB_URI in backend/.env");
  }
  process.exit(1);
});
