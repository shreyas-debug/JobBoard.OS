"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "jobboard_applied_ids";

function readFromStorage(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set<string>(JSON.parse(raw) as string[]);
  } catch {
    // ignore parse errors
  }
  return new Set<string>();
}

function writeToStorage(ids: Set<string>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    // ignore write errors
  }
}

export function useAppliedJobs() {
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setAppliedIds(readFromStorage());
  }, []);

  const applyToJob = useCallback((jobId: string) => {
    setAppliedIds((prev) => {
      const next = new Set(prev);
      next.add(jobId);
      writeToStorage(next);
      return next;
    });
  }, []);

  const unapplyFromJob = useCallback((jobId: string) => {
    setAppliedIds((prev) => {
      const next = new Set(prev);
      next.delete(jobId);
      writeToStorage(next);
      return next;
    });
  }, []);

  const isApplied = useCallback(
    (jobId: string) => appliedIds.has(jobId),
    [appliedIds]
  );

  return { appliedIds, applyToJob, unapplyFromJob, isApplied };
}
