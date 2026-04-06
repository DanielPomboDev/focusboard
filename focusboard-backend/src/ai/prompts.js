const taskBreakdownPrompt = (goal) => `
Break down this goal into smaller actionable tasks:
"${goal}"

Return a JSON array of exactly 5 tasks like this:
[
    { "title": "task title", "priority": "high/medium/low", "description": "brief description" },
    ...
]
Only return the JSON array. Nothing else.
`;

const autoPrioritizePrompt = (tasks) => `
Here are my current tasks:
${JSON.stringify(tasks, null, 2)}

Based on deadlines, priority levels, and status, suggest the top 3 tasks I should focus on today.

Return a JSON array like this:
[
    { "task_id": 1, "reason": "why this task should be done today" },
    ...
]
Only return the JSON array. Nothing else.
`;

const dailyPlanPrompt = (tasks, date) => `
Here are my tasks:
${JSON.stringify(tasks, null, 2)}

Build me an optimal daily plan for ${date}.
Consider priorities, due dates, and task status (skip done tasks).

Return a JSON array like this:
[
    { "task_id": 1, "schedule_time": "9:00 AM", "duration_minutes": 60, "reason": "why schedule at this time" },
    ...
]
Only return the JSON array. Nothing else.
`;

const naturalLanguagePrompt = (input) => `
Parse this natural language input into a task:
"${input}"

Extract: title, priority (low/medium/high), due_date (YYYY-MM-DD or null), description (or null)

Return a JSON object like this:
{
    "title": "task title",
    "priority": "medium",
    "due_date": "2026-04-10",
    "description": "optional description"
}
Today's date is ${new Date().toISOString().split('T')[0]}.
Only return the JSON object. Nothing else.
`;

const productivityInsightsPrompt = (completedTasks, pendingTasks) => `
Analyze my productivity based on my tasks:

Completed tasks this week:
${JSON.stringify(completedTasks, null, 2)}

Pending/overdue tasks:
${JSON.stringify(pendingTasks, null, 2)}

Give me a weekly productivity repor.

Return a JSON object like this:
{
    "score": 75,
    "summary": "2-3 sentence overall summary",
    "strengths": ["strength 1", "strength 2"],
    "improvements": ["improvement 1", "improvment 2"],
    "tip": "one actionable tip for next week"
}
Only return the JSON object. Nothing else.
`;

module.exports = {
    taskBreakdownPrompt,
    autoPrioritizePrompt,
    dailyPlanPrompt,
    naturalLanguagePrompt,
    productivityInsightsPrompt
};