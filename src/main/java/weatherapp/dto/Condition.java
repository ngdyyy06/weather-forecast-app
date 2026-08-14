package weatherapp.dto;

import java.util.PriorityQueue;

public class Condition {
    private String text;  // Dùng để đọc điều kiện thời tiết
    private String icon;

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
