# Tower of London – Web App Implementation

A browser-based, **Persian-language** implementation of the Tower of London (ToL) task designed for cognitive and neuropsychological assessment. This project aims to reproduce all **11 Tower of London variants** included in the PEBL2 battery, providing a versatile platform for both research and clinical use.

By preserving the core logic of classical paradigms while modernizing the data architecture, this tool enables high-resolution behavioral analysis of planning, executive function, and goal-directed problem solving.

---

## 📋 Included Task Variants
The platform *is going to* support the following 11 versions as categorized in the PEBL2 battery:

1. **Unconstrained Pile Heights**: 3/4/5 disks, progressive difficulty (24 trials).
2. **Unconstrained Pile Heights**: 3/4/5 disks, random presentation (24 trials).
3. **Shallice Test**: [1,2,3] pile heights, 3 disks (Shallice’s original 12 problems).
4. **Shallice Random**: [1,2,3] pile heights, 3 disks (30 random trials).
5. **Phillips (1999) A**: Unconstrained piles, 5 disks, progressive difficulty (8 trials).
6. **Phillips (1999) B**: Unconstrained piles, 5 disks, progressive difficulty (8 trials).
7. **Phillips (1999) C**: Unconstrained piles, 5 disks, progressive difficulty (8 trials).
8. **Fimbel et al. (2009) Old**: [1,2,3] pile heights, 3 disks, progressive difficulty (15 trials).
9. **Fimbel et al. (2009) Young**: [1,2,3] pile heights, 3 disks, progressive difficulty (35 trials).
10. **TOL-R (1998)**: [1,2,3] pile heights, 3 disks (30 problems, time/move limits).
11. **TOL-DX (1998)**: [1,2,3] pile heights, 3 disks (15 problems).

---

## 📊 Data Logging & Architecture
The data collection follows the hierarchical structure of PEBL2 but is extended with deeper clinical metrics and a recategorized three-file output system.

### Extended Clinical Variables
Beyond standard performance tracking, this implementation captures:
*   **`invalidMoves`**: Quantitative measure of rule-breaking behavior.
*   **`incorrectCompletionAttempts`**: "Premature" finish attempts (clinical "mistakes").
*   **`planningTimeMs`**: Latency before the first move is initiated.
*   **`efficiencyRatio`**: Ratio of optimal moves to actual moves made.
*   **`completionEfficiency`**: A session-wide metric: `(1 - (totalAttempts - totalTrials) / totalTrials) * 100`.

### Output Structure
Data is exported into three distinct CSV files for easier analysis:
1.  **`event_log.csv`**: Granular interaction data (clicks, invalid moves, resets, board states).
2.  **`trial_results.csv`**: Trial-by-trial summaries (timing, success, excess moves).
3.  **`session_summary.csv`**: Aggregated performance and efficiency scores for the participant.

---

## 🛠 Tech Stack
*   **Language**: Persian (Farsi) localized interface.
*   **Frontend**: HTML5, CSS3, and Vanilla JavaScript.
*   **Interaction**: Optimized click/tap-based model for desktop use.
*   **Data Export**: Client-side CSV generation for immediate research data retrieval.

Stay Posted.