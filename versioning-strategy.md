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




