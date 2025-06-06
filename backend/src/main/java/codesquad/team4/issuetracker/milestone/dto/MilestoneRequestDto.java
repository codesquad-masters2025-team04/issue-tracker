package codesquad.team4.issuetracker.milestone.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

public class MilestoneRequestDto {
    @AllArgsConstructor
    @Getter
    @Builder
    public static class CreateMilestoneDto {
        @NotBlank
        private String name;
        private String description;
        private LocalDate endDate;
    }

    @AllArgsConstructor
    @Getter
    @Builder
    public static class UpdateMilestoneDto {
        @NotBlank
        private String name;
        private String description;
        private LocalDate endDate;
        private Boolean isOpen;
    }
}
