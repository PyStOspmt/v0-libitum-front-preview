/**
 * Central type re-exports for Libitum
 *
 * Types are co-located with their stores for now.
 * Import from here for convenience, or directly from the store.
 */

// Chat
export type { Conversation, Message } from "@/store/chat.store"

// Dictionary
export type { City, Level, Subject } from "@/store/dictionary.store"

// Gamification
export type { Achievement, Level as GamificationLevel, UserProgress } from "@/store/gamification.store"

// Goals
export type { Goal, SubGoal } from "@/store/goal.store"

// Lessons
export type { CalendarEvent, Homework, Lesson } from "@/store/lesson.store"

// Requests
export type {
    BookingRequest,
    CommunicationStatus,
    LeadType,
    RequestStatus,
    Student,
    StudentType,
    TrialResult,
} from "@/store/request.store"

// Specialist
export type { SpecialistProfile, SpecialistType } from "@/store/specialist-profile.store"
