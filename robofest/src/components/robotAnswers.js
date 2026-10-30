// Answers come from the event details and FAQs already displayed on this site.
export function answerQuestion(question, events, faqs) {
  const q = question.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  const official = 'https://robotix.nitrr.ac.in/robofest';
  const reply = (text, link = null) => ({ text, link });
  const unknown = () => reply("I don’t have that detail in my event guide yet. Please check with ROBOTiX for a confirmed answer.", official);
  const event = events.find(e => q.includes(e.title.toLowerCase()) || q.includes({ war: 'robo war', race: 'robo race', thon: 'robo thon' }[e.id]));
  if (!q) return reply('Choose a question below, or ask me about the events, teams, dates, or registration.');
  if (/\b(fee|fees|cost|prize|prizes|accommodation|hostel|refund|contact|phone|certificate|certificates|deadline)\b/.test(q)) return unknown();
  if (/\b(ayush|chauhan|owner|creator|developer)\b/.test(q) || /\b(who (made|built|created|developed|designed) (you|bolt|this|the website))\b/.test(q)) {
    return reply('My creator is Ayush Chauhan, a third-semester Information Technology student at NIT Raipur. He built this Robofest landing page and chose its design and interactions.');
  }
  if (/\b(register|registration|signup|sign up|apply|join|upcoming|next|2027|2028)\b/.test(q)) return reply(faqs[3][1], official);
  if (/\b(team|teams|member|members|solo|alone|size|sizes)\b/.test(q) && !/\b(robot|dimensions)\b/.test(q)) return reply(event ? `${event.title}: ${event.team}. Check the official event rules for complete eligibility details.` : faqs[2][1], official);
  if (/\b(when|date|dates|time|schedule|over|ended)\b/.test(q)) return reply(`The March 2026 edition has concluded. ${event ? `${event.title} was listed for ${event.date}.` : 'It was held on 22–23 March 2026.'} Check ROBOTiX for future edition announcements.`, official);
  if (/\b(where|location|venue|address)\b/.test(q)) return reply('Robofest is held at NIT Raipur, Chhattisgarh, India. Check the official event details for the exact venue and reporting instructions.', official);
  if (/\b(beginner|beginners|experience|newbie|eligible|eligibility|skill|skills)\b/.test(q)) return reply(faqs[1][1], official);
  if (event) {
    if (/\b(weight|dimension|dimensions|limit|rules|specifications)\b/.test(q)) return reply(`${event.detail} ${event.format}.`, event.url);
    if (/^(robo\s?(war|wars|race|thon))$/.test(q) || /\b(what|about|explain|tell|event|work|works)\b/.test(q)) return reply(`${event.title}: ${event.description} Teams: ${event.team}. Format: ${event.format}.`, event.url);
    return unknown();
  }
  if (/\b(events|competitions|competition|choose)\b/.test(q)) return reply('The three featured events are Robowar (robot combat), Roborace (an obstacle course), and Robothon (a 24-hour robotics hackathon). There are seven events listed on the official website.', `${official}#events`);
  if (/\b(robofest|festival|organizer|organised|organized|organizes)\b/.test(q)) return reply(faqs[0][1]);
  if (/^(hi|hello|hey|hello bolt|hi bolt|hey bolt)$/.test(q)) return reply('Hi! I’m Bolt. Ask me about Robofest, the competitions, team sizes, or registration.');
  if (/\b(thanks|thank you)\b/.test(q)) return reply('You’re welcome! Let me know if you have another event question.');
  if (/\b(who are you|your name)\b/.test(q)) return reply('I’m Bolt, your Robofest event guide. I answer basic questions using the information on this website.');
  return unknown();
}
