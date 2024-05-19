﻿namespace WebApiExam.Models.Dto
{
    public class UpdateTaskDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public string Priority { get; set; }
        public string Status { get; set; }

        public DateTime UpdatedAt {get; set; }

}
}
