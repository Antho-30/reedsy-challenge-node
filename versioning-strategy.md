# Versioning Strategy for Novels

## 1. Introduction

This document outlines the strategy proposed to store and manage multiple versions of novels. A quick reminder of the following requirements needed : 

1. **Show the novel in its current state:** Quickly access the latest version of the novel.
2. **Show the novel at any point in its history:** Retrieve any previous version of the novel.
3. **Show the changes made between two versions:** Provide a mechanism to display differences between versions.
4. **Prioritize disk space efficiency:** Optimize storage by balancing full snapshots and incremental changes.
5. **Discuss trade-offs and mitigations:** Highlight potential compromises and how they can be addressed.
6. **Consider domain-specific issues:** Address any challenges specific to the management of versioned novels.

In the following sections, I will detail the approaches considered, the chosen solution, and the design of the data structures and APIs that support this versioning strategy.

## 2. Requirements and Challenges

This section outlines the key requirements for a novel versioning system as specified in the challenge, along with the main challenges and constraints that must be addressed.

### Functional Requirements

- **Current State Access:** - **Historical Access:** - **Diff Display:** 
  It refers to the first 3 points of the Introduction.
  
### Non-Functional Requirements and Challenges

- **Disk Space Efficiency:**  
  Given that novels may have numerous versions over time, the strategy must optimize storage usage. This may involve a choice between full snapshots & others options like showing deltas. For our purpose , I'll choose a hybrid-solution, And I will arbitrarely showcase a Snapshot every X versions. More in-depths details further in the document.

- **Performance vs. Storage Trade-Offs:**  
  - **Full Snapshots:** Provide fast access but can lead to high storage usage.  
  - **Deltas:** Save storage space by only recording changes, but require additional processing to reconstruct a full version.  
  - **Hybrid Approach:** Aims to balance the two but add some complexity.
  
- **Domain-Specific Considerations:**  
  I see 3 mains considerations to address here : 

  - **Collaborative Editing:** In a real-world scenario, a possibility is that multiple authors edit the same novel, potentially causing conflicts or complex merge scenarios.
  - **Frequency of Updates:** Highly dynamic novels might generate a large number of versions, influencing the choice of storage strategy.
  - **Auditability and Legal Requirements:** The system might need to maintain an immutable history of changes for compliance or audit purposes.

### Discussion

The challenge is not only to design a storage solution that meets these functional requirements but also to balance them with performance and scalability concerns. In the next section, I will take more in details about the Hybrid approach.

## 3. Approaches to Versioning

For this challenge, I propose a **hybrid approach** as the most balanced solution for managing versioned novels. This approach combines the advantages of full snapshots with the storage efficiency of delta-based storage, while mitigating some of the drawbacks inherent to each method.

### 3.1 Hybrid Approach: The Proposed Solution

**Description:**  
In the hybrid approach, a complete snapshot of the novel is stored at fixed intervals (for example, every 5 versions). For the versions in between, only the changes (deltas) from the previous version are stored. The initial version is stored as a full snapshot, and subsequent versions store only the differences until a new full snapshot is taken.

### 3.2 Trade-offs:
**Advantages:**  
- **Balanced Performance:**  
  - *Quick Access:* Recent versions are readily available through full snapshots.  
  - *Efficient Storage:* Intermediate versions are stored as compact deltas, reducing overall disk usage.
- **Flexibility:**  
  - The interval for full snapshots can be tuned based on update frequency and the typical size of changes.
- **Scalability:**  
  - As the number of versions increases, the storage footprint remains manageable compared to storing full copies of every version.

**Disadvantages:**  
- **Increased Complexity:**  
  - Managing snapshot intervals and reconstructing a version from a combination of a snapshot and several deltas adds complexity.
- **Reconstruction Overhead:**  
  - Retrieving a version that falls between full snapshots requires applying all relevant deltas to the last snapshot, which may incur a performance cost in some cases.

### 3.3 In Summary 
In summary, while the **full snapshot approach** offers simplicity and immediate access to every version, it quickly becomes storage-intensive as the number of versions grows. The **hybrid approach** provides a scalable and balanced solution, combining rapid access to recent versions with significant storage savings for older versions, making it well-suited for a production-grade system managing versioned novels.

## 4. Storage Structure

Each novel is stored as a single document in MongoDB with the following structure:
- **Current State:**  
  A field `currentContent` holds the complete, most recent version of the novel for quick retrieval.
- **Versions Array:**  
  A field `versions` stores an array of version objects. Each object contains:
  - `versionNumber`: A sequential number identifying the version.
  - `content`: Either a full snapshot (if this version is a full snapshot) or a delta representing the changes from the previous version.
  - `created_at`: The timestamp when this version was recorded.
- **Metadata:**  
  Fields such as `title`, `author`, `created_at`, and `updated_at` manage the overall document information.

### 4.2 Snapshot and Delta Strategy

- **Full Snapshot Interval:**  
  A complete snapshot of the novel is stored every 5 versions.
- **Delta Storage:**  
  For versions between full snapshots, only the differences (deltas) from the previous version are stored.

### 4.3 Data Retrieval

- **Current State Access:**  
  The `currentContent` field allows immediate access to the latest version of the novel.
- **Historical Access:**  
  To retrieve a specific historical version, the system locates the nearest preceding full snapshot and applies the sequence of deltas up to the desired version.
- **Diff Calculation:**  
  When a user requests the differences between two versions, a diff algorithm (e.g., using `diff-match-patch`) can be applied on the fly to compare the respective version contents.

### 4.4 Example Document in MongoDB

Below is an example JSON representation of a novel stored using the hybrid approach:

```json
{
  "_id": "645d5f1234567890abcdef12",
  "title": "A Fullstack Engineer Challenge",
  "author": "Anthony M",
  "currentContent": "The current full text of the novel...",
  "versions": [
    {
      "versionNumber": 1,
      "content": "Full text of version 1",
      "created_at": "2025-02-01T12:00:00Z"
    },
    {
      "versionNumber": 2,
      "content": "Delta from version 1 to version 2",
      "created_at": "2025-02-12T12:00:00Z"
    },
    {
      "versionNumber": 3,
      "content": "Delta from version 2 to version 3",
      "created_at": "2025-03-01T12:00:00Z"
    },
    {
      "versionNumber": 5,
      "content": "Full snapshot of version 5",
      "created_at": "2025-03-20T12:00:00Z"
    }
  ],
  "created_at": "2025-02-01T12:00:00Z",
  "updated_at": "2025-03-20T12:00:00Z"
}
```

Note that it's just a illustrative representation of what an actual document could like in MongoDB in my opinion when we have the hybrid approach in mind.

## 5. Managing Differences Between Versions

The differences between two versions are calculated **on-the-fly** using a diff algorithm (e.g `diff-match-patch`). I choose this approach because :

- It avoids the additional storage overhead required for storing precomputed diffs.
- It simplifies the implementation by not requiring a separate process to manage and update diffs.

### [!WARNING]
- It may introduce some computational overhead for very large texts, and because we're talkings about Novels, it might take some time.

With this method, It's only when a user requests to see the changes between two versions, that the system retrieves the full content of both versions and computes the diff dynamically, providing an accurate and up-to-date comparison.


