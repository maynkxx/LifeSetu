#LifeSetu: Crisis Resource Coordination Engine

## Problem Statement
During natural disasters or local emergencies, resources (food, beds, blood, volunteers) exist, but coordination is chaotic and slow. Information is fragmented between NGOs, victims, and volunteers.

## Solution
LifeSetu is a high-reliability backend system that acts as a centralized "Setu" (Bridge). It matches urgent help requests with the nearest available resources using a priority-based algorithm.

## Key Features
* **Emergency SOS:** Victims raise help requests with geo-location.
* **Resource Registration:** NGOs/Volunteers list available inventory (ambulances, kits, beds).
* **Priority Matching:** Backend logic ranks requests by severity and proximity.
* **Real-time Coordination:** A state-driven tracking system for request lifecycles.