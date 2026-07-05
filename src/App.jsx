import { useState } from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import CourseDetail from "./components/CourseDetail";
import BookingModal from "./components/BookingModal";
import ModifySessionModal from "./components/ModifySessionModal";
import { initialCourses, pickNextProposal } from "./mockData";

export default function App() {
  const [courses, setCourses] = useState(initialCourses);
  const [currentView, setCurrentView] = useState("dashboard"); // 'dashboard' | 'courseDetail'
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // null | 'proposal' | 'modify'
  // null = deciding on course.pendingProposal; otherwise the confirmedSessions index being edited
  const [editingIndex, setEditingIndex] = useState(null);

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) ?? null;

  function goToDashboard() {
    setCurrentView("dashboard");
    setSelectedCourseId(null);
    setActiveModal(null);
    setEditingIndex(null);
  }

  function goToCourse(id) {
    setSelectedCourseId(id);
    setCurrentView("courseDetail");
  }

  function updateCourse(id, changes) {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...changes } : c)));
  }

  function closeModal() {
    setActiveModal(null);
    setEditingIndex(null);
  }

  // "Book Suggested Session" — the course already has a pendingProposal, just review it.
  function handleOpenProposal() {
    setEditingIndex(null);
    setActiveModal("proposal");
  }

  // "Suggest a Session" (none state) or "+ Book Another Session" (already has confirmed ones) —
  // there's no pendingProposal yet, so create one from the course's pool before opening the modal.
  function handleSuggestOrBookAnother() {
    updateCourse(selectedCourseId, { pendingProposal: pickNextProposal(selectedCourse) });
    setEditingIndex(null);
    setActiveModal("proposal");
  }

  // "Edit" on an already-confirmed session — go straight to picking a new time for that one.
  function handleEditConfirmed(index) {
    setEditingIndex(index);
    setActiveModal("modify");
  }

  function handleAccept() {
    updateCourse(selectedCourseId, {
      confirmedSessions: [...selectedCourse.confirmedSessions, selectedCourse.pendingProposal],
      pendingProposal: null,
    });
    closeModal();
  }

  function handleReject() {
    updateCourse(selectedCourseId, { pendingProposal: null });
    closeModal();
  }

  function handlePickSlot(slot) {
    if (editingIndex !== null) {
      const updatedSessions = selectedCourse.confirmedSessions.map((session, i) =>
        i === editingIndex ? { ...slot, focus: session.focus } : session
      );
      updateCourse(selectedCourseId, { confirmedSessions: updatedSessions });
    } else {
      updateCourse(selectedCourseId, {
        confirmedSessions: [
          ...selectedCourse.confirmedSessions,
          { ...slot, focus: selectedCourse.pendingProposal.focus },
        ],
        pendingProposal: null,
      });
    }
    closeModal();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onGoHome={goToDashboard} />

      {currentView === "dashboard" && (
        <Dashboard courses={courses} onSelectCourse={goToCourse} />
      )}

      {currentView === "courseDetail" && selectedCourse && (
        <CourseDetail
          course={selectedCourse}
          onBack={goToDashboard}
          onOpenProposal={handleOpenProposal}
          onSuggestOrBookAnother={handleSuggestOrBookAnother}
          onEditConfirmed={handleEditConfirmed}
        />
      )}

      {activeModal === "proposal" && selectedCourse && (
        <BookingModal
          course={selectedCourse}
          onAccept={handleAccept}
          onModify={() => setActiveModal("modify")}
          onReject={handleReject}
          onClose={closeModal}
        />
      )}

      {activeModal === "modify" && selectedCourse && (
        <ModifySessionModal course={selectedCourse} onPick={handlePickSlot} onCancel={closeModal} />
      )}
    </div>
  );
}
