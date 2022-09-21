
def _count_dimension(analysis):
    question_set = analysis['questao_set']
    dimensions = {'D1': {'amount': 0, 'checked': 0}, 'D2': {'amount': 0, 'checked': 0}, 'D3': {'amount': 0, 'checked': 0}, 'D4': {'amount': 0, 'checked': 0}}
    for question in question_set:
        dimensions[question['question']['dimension']]['amount'] += 1
        if question['answer']:
            dimensions[question['question']['dimension']]['checked'] += 1
    return dimensions