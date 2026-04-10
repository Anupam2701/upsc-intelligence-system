def calculate_total_hours(sessions):
    total = sum(s.duration for s in sessions)
    return total

def subject_wise_hours(sessions):
    data = {}
    for s in sessions:
        data[s.subject] = data.get(s.subject, 0) + s.duration
    return data