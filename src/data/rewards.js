// Rewards system — unlocked by completing milestones
// Each reward is tied to a condition checked against taskState

export const rewards = [
  {
    id: 'reward-1',
    emoji: '🛍️',
    name: 'DRIP DEPLOYED',
    reward: 'Uniqlo run — buy whatever you want',
    description: 'You built an entire outreach engine and deployed it to production. Most people talk about starting a business for years. You did it in a day.',
    trigger: 'day-1',
    triggerLabel: 'Complete Day 1',
  },
  {
    id: 'reward-2',
    emoji: '🍜',
    name: 'CARB LOADING FOR GLORY',
    reward: 'Nice dinner out — somewhere good, not a food court',
    description: 'Website live. Emails written. The machine has a face now. You went from "idea guy" to "guy with a real business online." That\'s not nothing — that\'s everything.',
    trigger: 'day-3',
    triggerLabel: 'Complete Day 3',
  },
  {
    id: 'reward-3',
    emoji: '💆',
    name: 'RECOVERY PROTOCOL',
    reward: 'Thai massage — 2 hours, the works',
    description: 'First real leads are in the pipeline. Real agency owners are about to read emails you wrote about a system you built. You\'re not playing business anymore. You\'re in it.',
    trigger: 'day-5',
    triggerLabel: 'Complete Day 5',
  },
  {
    id: 'reward-4',
    emoji: '🔥',
    name: 'STRESS TESTED',
    reward: 'You know what this one is',
    description: 'Sales prep done. Objections handled before they\'re even raised. You\'re not just ready for the call — you\'re dangerous on one. Go release some energy.',
    trigger: 'day-6',
    triggerLabel: 'Complete Day 6',
  },
  {
    id: 'reward-5',
    emoji: '🎧',
    name: 'OPERATOR UPGRADE',
    reward: 'Buy yourself something — headphones, tech, gear',
    description: 'You showed up every single day for 9 straight days. Sent the emails. Recorded the Looms. Responded to replies. Most people quit after 3. You didn\'t even flinch.',
    trigger: 'days-7-15',
    triggerLabel: 'Complete Days 7–15 streak',
  },
  {
    id: 'reward-6',
    emoji: '🥃',
    name: 'PREMATURE CELEBRATION',
    reward: 'Night out — drinks, good energy, you earned a breather',
    description: 'Someone said yes to a call. A real human wants to hear your pitch. That\'s not luck — that\'s the system you built doing exactly what it was designed to do.',
    trigger: 'close-1',
    triggerLabel: 'Book first discovery call',
  },
  {
    id: 'reward-7',
    emoji: '🏆',
    name: 'CONTRACT KILLER',
    reward: 'Big celebration — dinner with the best people, your call',
    description: 'Signed contract in hand. Someone bet real money on you. Not because of a resume or a referral — because you showed up, built something real, and sold it face to face.',
    trigger: 'close-6',
    triggerLabel: 'Collect signed contract',
  },
  {
    id: 'reward-8',
    emoji: '👑',
    name: 'THE FUCKING MAN',
    reward: 'Whatever you want. No limits. You did it.',
    description: 'Payment received. Client onboarded. You went from $10K in debt in Thailand with nothing but a laptop and an idea — to a funded, operational AI business with a paying client in 22 days. Nobody gave this to you. Nobody handed you a playbook. You built the playbook, executed it, and closed. The debt clock is ticking backwards now. You\'re not going back to the states. You\'re not going back to anything. You\'re THE FUCKING MAN.',
    trigger: 'close-8',
    triggerLabel: 'Confirm payment received',
  },
]

// Check if a reward is unlocked based on taskState
export function isRewardUnlocked(reward, taskState, phases) {
  const { trigger } = reward

  // Single task trigger (e.g. 'close-1', 'close-6', 'close-8')
  if (taskState[trigger]) return true

  // Phase/day trigger — check if all tasks in that phase are complete
  const phase = phases.find(p => p.id === trigger)
  if (phase) {
    const allTasks = phase.categories.flatMap(c => c.tasks)
    return allTasks.length > 0 && allTasks.every(t => taskState[t.id])
  }

  return false
}

// Daily philosophical quotes — one per day of the sprint
export const dailyQuotes = [
  { text: "A man who dares to waste one hour of time has not discovered the value of life.", author: "Charles Darwin" },
  { text: "The impediment to action advances action. What stands in the way becomes the way.", author: "Marcus Aurelius" },
  { text: "You have power over your mind — not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius" },
  { text: "He who has a why to live can bear almost any how.", author: "Friedrich Nietzsche" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "Do not pray for an easy life, pray for the strength to endure a difficult one.", author: "Bruce Lee" },
  { text: "Wealth consists not in having great possessions, but in having few wants.", author: "Epictetus" },
  { text: "It is not the man who has too little that is poor, but the one who hankers after more.", author: "Seneca" },
  { text: "The world breaks everyone, and afterward, many are strong at the broken places.", author: "Ernest Hemingway" },
  { text: "We suffer more often in imagination than in reality.", author: "Seneca" },
  { text: "A ship in harbor is safe, but that is not what ships are built for.", author: "John A. Shedd" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "What you do speaks so loudly that I cannot hear what you say.", author: "Ralph Waldo Emerson" },
  { text: "Discipline equals freedom.", author: "Jocko Willink" },
  { text: "The cave you fear to enter holds the treasure you seek.", author: "Joseph Campbell" },
  { text: "Man cannot remake himself without suffering, for he is both the marble and the sculptor.", author: "Alexis Carrel" },
  { text: "If you are going through hell, keep going.", author: "Winston Churchill" },
  { text: "No man is free who is not master of himself.", author: "Epictetus" },
  { text: "The obstacle is the way.", author: "Ryan Holiday" },
  { text: "Freedom is what you do with what's been done to you.", author: "Jean-Paul Sartre" },
  { text: "The harder the conflict, the more glorious the triumph.", author: "Thomas Paine" },
  { text: "First they ignore you, then they laugh at you, then they fight you, then you win.", author: "Mahatma Gandhi" },
  { text: "A lion doesn't concern himself with the opinion of sheep.", author: "George R.R. Martin" },
]

// Get today's quote based on day number in the sprint
export function getTodayQuote() {
  const start = new Date('2026-03-09T00:00:00')
  const now = new Date()
  const dayNum = Math.max(0, Math.floor((now - start) / (1000 * 60 * 60 * 24)))
  return dailyQuotes[dayNum % dailyQuotes.length]
}
