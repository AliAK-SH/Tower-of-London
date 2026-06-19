import JSZip from "jszip";
import { EventLogRow, TrialResultRow, SessionSummaryRow } from "../types";

function escapeCSV(value: unknown): string {
  const str = String(value ?? "");
  if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

function toCSV(rows: any[], columns: string[]): string {
  const header = columns.map(escapeCSV).join(",");
  const body = rows.map((row) => columns.map((c) => escapeCSV(row[c])).join(","));
  return [header, ...body].join("\r\n");
}

export async function exportAll(
  eventLog: EventLogRow[],
  trialResults: TrialResultRow[],
  summary: SessionSummaryRow
) {
  const zip = new JSZip();

  // 1. event_log.csv
  const eventColumns = [
    "userName", "userId", "testId", "trialIndex", "sessionDate",
    "eventDateTime", "currentPattern", "endPattern", "eventTime",
    "trialTimeMs", "totalTimeMs", "moveCount",
    "incorrectCompletionAttempts", "incorrectCompletionConfig", "eventType"
  ];
  zip.file("event_log.csv", "\ufeff" + toCSV(eventLog, eventColumns));

  // 2. test_results.csv
  const resultColumns = [
    "userName", "userId", "testId", "trialIndex", "sessionDate",
    "startPattern", "endPattern",
    "firstMoveTimeMs", "planningTimeMs", "implementationTimeMs",
    "trialTimeMs", "remainingTimeMs", "moveCount", "excessMoves",
    "incorrectCompletionAttempts", "incorrectCompletionConfig",
    "trialSuccess", "optimalSolve"
  ];
  zip.file("test_results.csv", "\ufeff" + toCSV(trialResults, resultColumns));

  // 3. session_summary.csv
  const summaryColumns = [
    "userName", "userId", "testId", "sessionDate", "sessionStartTime",
    "totalTrials", "totalAttempts", "totalTimeMs", "totalMoveCount",
    "totalOptimalMoves", "totalExcessMoves", "totalSuccess", "successRate",
    "totalOptimalSolve", "optimalSolveRate", "moveAccuracy", "attemptAccuracy"
  ];
  zip.file("session_summary.csv", "\ufeff" + toCSV([summary], summaryColumns));

  // 4. session_summary.txt
  const avgMoveCount = summary.totalTrials > 0
    ? (summary.totalMoveCount / summary.totalTrials).toFixed(2)
    : "0";
  const avgTrialTimeMs = summary.totalTrials > 0
    ? Math.round(summary.totalTimeMs / summary.totalTrials)
    : 0;

  const txt = [
    "Tower of London Session Summary",
    "===============================",
    "",
    "Participant",
    "-----------",
    `User Name: ${summary.userName}`,
    `User ID: ${summary.userId}`,
    `Test ID: ${summary.testId}`,
    `Session Date: ${summary.sessionDate}`,
    `Session Start Time: ${summary.sessionStartTime}`,
    "",
    "Test Information",
    "----------------",
    `Total Trials: ${summary.totalTrials}`,
    `Total Time: ${summary.totalTimeMs} ms`,
    `Average Trial Time: ${avgTrialTimeMs} ms`,
    "",
    "Performance",
    "-----------",
    `Total Success: ${summary.totalSuccess}`,
    `Success Rate: ${summary.successRate}`,
    `Total Optimal Solves: ${summary.totalOptimalSolve}`,
    `Optimal Solve Rate: ${summary.optimalSolveRate}`,
    "",
    "Behavior",
    "--------",
    `Total Move Count: ${summary.totalMoveCount}`,
    `Total Excess Moves: ${summary.totalExcessMoves}`,
    `Average Move Count: ${avgMoveCount}`,
    "",
    "Accuracy",
    "--------",
    `Move Accuracy: ${summary.moveAccuracy}`,
    `Attempt Accuracy: ${summary.attemptAccuracy}`,
  ].join("\r\n");

  zip.file("session_summary.txt", txt);

  const content = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${summary.userId}_output.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
