import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { Sidebar } from './components/Sidebar';
import { CampusMap } from './components/CampusMap';

const campusLocations = [
  {
    id: 'block-a',
    name: 'Block A (B.Tech)',
    description: 'Main academic block for B.Tech students. Houses multiple departments and modern laboratories.',
    departments: ['Computer Science', 'Electronics', 'Mechanical Engineering'],
    timings: '8:00 AM - 6:00 PM',
    type: 'academic'
  },
  {
    id: 'block-b',
    name: 'Block B (Diploma)',
    description: 'Diploma courses building with well-equipped classrooms and workshops.',
    departments: ['Diploma Engineering', 'Technical Courses'],
    timings: '8:00 AM - 5:00 PM',
    type: 'academic'
  },
  {
    id: 'block-c',
    name: 'Block C (Nursing)',
    description: 'Nursing college building with medical labs and training facilities.',
    departments: ['Nursing', 'Healthcare'],
    timings: '8:00 AM - 6:00 PM',
    type: 'academic'
  },
  {
    id: 'boys-hostel',
    name: 'Boys Hostel',
    description: 'Residential facility for male students with modern amenities.',
    timings: '24/7 Access',
    type: 'residential'
  },
  {
    id: 'girls-hostel',
    name: 'Girls Hostel',
    description: 'Residential facility for female students with modern amenities and security.',
    timings: '24/7 Access',
    type: 'residential'
  },
  {
    id: 'ground',
    name: 'Ground',
    description: 'Sports ground for various outdoor activities, cricket, football, and athletics.',
    timings: '6:00 AM - 8:00 PM',
    type: 'sports'
  },
  {
    id: 'canteen',
    name: 'Canteen',
    description: 'Campus cafeteria serving fresh meals and snacks throughout the day.',
    timings: '7:00 AM - 9:00 PM',
    type: 'facility'
  },
  {
    id: 'main-gate',
    name: 'Main Gate',
    description: 'Primary entrance to the campus with security checkpoint.',
    timings: '24/7 Access',
    type: 'entrance'
  },
  {
    id: 'gate-2',
    name: 'Gate 2',
    description: 'Secondary entrance to the campus with security checkpoint and vehicle access.',
    timings: '24/7 Access',
    type: 'entrance'
  },
  {
    id: 'gate-3',
    name: 'Gate 3',
    description: 'Tertiary entrance for auxiliary access with security verification.',
    timings: '24/7 Access',
    type: 'entrance'
  },
  {
    id: 'bus-parking',
    name: 'Bus Parking',
    description: 'Designated parking area for campus buses and transportation vehicles.',
    timings: '6:00 AM - 8:00 PM',
    type: 'facility'
  },
  {
    id: 'student-parking',
    name: 'Student Parking',
    description: 'Designated parking area for students with short-term and long-term bays.',
    timings: '6:00 AM - 10:00 PM',
    type: 'facility'
  },
  {
    id: 'security-room',
    name: 'Security Room',
    description: 'Campus security headquarters and monitoring center for campus safety and emergency response.',
    timings: '24/7 Access',
    type: 'facility'
  },
  {
    id: 'center',
    name: 'Center',
    description: 'Central point of the campus - common meeting area.',
    type: 'landmark'
  }
  ,
  {
    id: 'kalam',
    name: 'Kalam Science College',
    description: 'Kalam Science College (Junior Science College) with well-equipped science labs and classrooms.',
    departments: ['Physics', 'Chemistry', 'Mathematics'],
    timings: '8:30 AM - 4:30 PM',
    type: 'academic'
  }
];

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const sortedLocations = [...campusLocations].sort((a, b) => a.name.localeCompare(b.name));

  const handleLocationSelect = (locationId) => {
    const location = campusLocations.find(loc => loc.id === locationId);
    if (location) {
      setSelectedLocation(location);
      // Auto-open sidebar when location is selected
      setSidebarCollapsed(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const found = campusLocations.find(loc => 
        loc.name.toLowerCase().includes(query.toLowerCase())
      );
      if (found) {
        setSelectedLocation(found);
      }
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Search Bar */}
      <SearchBar onSearch={handleSearch} />
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          locations={sortedLocations}
          selectedLocation={selectedLocation}
          onLocationSelect={handleLocationSelect}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        {/* Campus Map Area */}
        <CampusMap
          selectedLocation={selectedLocation}
          onLocationClick={handleLocationSelect}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>
    </div>
  );
}
